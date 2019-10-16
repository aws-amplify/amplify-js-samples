import React, { Component } from 'react';
import { ListAlbums, SubscribeToNewAlbums, GetAlbum, UpdateAlbum, DeleteAlbum, NewPhoto } from './graphQL';
import { Divider, Form, Header, Input, List, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { Connect, S3Image } from 'aws-amplify-react';
import {v4 as uuid} from 'uuid';
import awsconfig from './aws-exports';
import makeComparator from './utils';

class NewS3Photo extends Component {
    constructor(props) {
      super(props);
      this.state = { permission: 'public' };
    }
  
    render() {
      return (
        <Segment data-test='image-loader'>
          <Header as='h3'>Upload your photo</Header>
          <select data-test="select-permission-level" value={this.state.permission} onChange={(evt)=>this.setState({permission: evt.target.value})}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="protected">Protected</option>
          </select>
          <S3Image picker level={this.state.permission} imgKey='test'/>
        </Segment>
      );
    }
}
class S3ImageUpload extends Component {
    constructor(props) {
      super(props);
      this.state = { uploading: false , permission: 'public'};
    }
  
    uploadFile = async (file) => {
      const fileName = uuid();
      const user = await Auth.currentAuthenticatedUser();
  
      const result = await Storage.put(
        fileName, 
        file, 
        {
          level: this.state.permission,
          metadata: { albumid: this.props.albumId, owner: user.username }
        }
      );
  
      await API.graphql(graphqlOperation(NewPhoto, { bucket: awsconfig.aws_user_files_s3_bucket, 
        fullsize: {
          key: result.key,
          width: 200,
          height: 200
        }, 
        thumbnail: {
          key: result.key,
          width: 100,
          height: 100
        }, 
        photoAlbumId: this.props.albumId
      }));
    }
  
    onChange = async (evt) => {
      this.setState({uploading: true});
      
      let files = [];
      for (let i=0; i<evt.target.files.length; i++) {
        files.push(evt.target.files.item(i));
      }
      await Promise.all(files.map(f => this.uploadFile(f)));
  
      this.setState({uploading: false});
    }

    startUpload = () => document.getElementById('add-image-file-input').click();
  
    render() {
      return (
        <div>
          <br/>
          <Form.Button
            onClick={this.startUpload}
            disabled={this.state.uploading}
            icon='file image outline'
            content={ this.state.uploading ? 'Uploading...' : 'Add Images' }
          />
          <input
            id='add-image-file-input'
            type="file"
            accept='image/*'
            multiple
            onChange={this.onChange}
            style={{ display: 'none ' }}
          />
        </div>
      );
    }
}
  
  
class PhotosList extends Component {
  photoItems() {
    return this.props.photos.map(photo =>
      <S3Image 
        imgKey={photo.thumbnail.key} 
        level='public'
        style={{display: 'inline-block', 'paddingRight': '5px'}}
        photoId = {photo.id}
      />
    );
  }
  
  render() {
    return (
      <div>
        <Divider hidden />
        {this.photoItems()}
      </div>
    );
  }
}
  
  
class NewAlbum extends Component {
    constructor(props) {
      super(props);
      this.state = {
        albumName: ''
        };
      }
  
    handleChange = (event) => {
      let change = {};
      change[event.target.name] = event.target.value;
      this.setState(change);
    }
  
    handleSubmit = async (event) => {
      event.preventDefault();
      const NewAlbum = `mutation NewAlbum($name: String!) {
        createAlbum(input: {name: $name}) {
          id
          name
        }
      }`;
      
      await API.graphql(graphqlOperation(NewAlbum, { name: this.state.albumName }));
      this.setState({ albumName: '' })
    }
  
    render() {
      return (
        <Segment>
          <Header as='h3'>Add a new album</Header>
            <Input
            type='text'
            placeholder='New Album Name'
            icon='plus'
            iconPosition='left'
            action={{ content: 'Create', onClick: this.handleSubmit }}
            name='albumName'
            value={this.state.albumName}
            onChange={this.handleChange}
            data-test='create-album-input'
            />
          </Segment>
        );
      }
}
  
  
class AlbumsList extends Component {
    albumItems() {
      return this.props.albums.sort(makeComparator('name')).map(album =>
        <List.Item key={album.id} data-test='album-list-item'>
          <NavLink data-test='album-list-item-link' to={`/albums/${album.id}`}>{album.name}</NavLink>
        </List.Item>
      );
    }
  
    render() {
      return (
        <Segment data-test='album'>
          <Header as='h3'>My Albums</Header>
          <List divided relaxed data-test='album-list'>
            {this.albumItems()}
          </List>
        </Segment>
      );
    }
}
  
  
class AlbumDetailsLoader extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            nextTokenForPhotos: null,
            hasMorePhotos: true,
            album: null,
            loading: true
        };
    }
  
    async loadMorePhotos() {
        if (!this.state.hasMorePhotos) return;
  
        this.setState({ loading: true });
        const { data } = await API.graphql(graphqlOperation(GetAlbum, {id: this.props.id, nextTokenForPhotos: this.state.nextTokenForPhotos}));
        let album;
        if (this.state.album === null) {
            album = data.getAlbum;
        } else {
            album = this.state.album;
            album.photos.items = album.photos.items.concat(data.getAlbum.photos.items);
        }
        this.setState({ 
            album: album,
            loading: false,
            nextTokenForPhotos: data.getAlbum.photos.nextToken,
            hasMorePhotos: data.getAlbum.photos.nextToken !== null
        });
    }
  
    componentDidMount() {
        this.loadMorePhotos();
    }
  
    render() {
        return (
            <AlbumDetails 
                loadingPhotos={this.state.loading} 
                album={this.state.album} 
                loadMorePhotos={this.loadMorePhotos.bind(this)} 
                hasMorePhotos={this.state.hasMorePhotos} 
            />
        );
    }
}
  
  
class AlbumDetails extends Component {

    deleteAlbum = async () => {
        await API.graphql(graphqlOperation(DeleteAlbum, {id:this.props.album.id}));
        window.location.assign('/');
    };

    updateAlbum = async () => {
        if (this.state && this.state.albumName) {
          await API.graphql(graphqlOperation(UpdateAlbum, {id:this.props.album.id, name:this.state.albumName}));
        } else {
          alert("Name cannot be empty")
        }
    };
  
    render() {
        if (!this.props.album) return 'Loading album...';
        
        return (
          <Segment>
            <Header as='h3'>{this.props.album.name}</Header>
            <Form.Button
              onClick={this.deleteAlbum}
              icon='file image outline'
              content='Delete Album'
              data-test='delete-album-button'
            />
            <br/>
            <Input
              type='text'
              placeholder='New Album Name'
              data-test='album-name-input'
              icon='plus'
              iconPosition='left'
              action={{ content: 'Update', onClick: this.updateAlbum }}
              name='albumName'
              onChange={(evt) => this.setState({albumName: evt.target.value})}
            />
            <br/>
            <S3ImageUpload albumId={this.props.album.id}/>        
            <PhotosList photos={this.props.album.photos.items} />
            {
                this.props.hasMorePhotos && 
                <Form.Button
                onClick={this.props.loadMorePhotos}
                icon='refresh'
                disabled={this.props.loadingPhotos}
                content={this.props.loadingPhotos ? 'Loading...' : 'Load more photos'}
                />
            }
          </Segment>
        )
    }
}
  
  
class AlbumsListLoader extends Component {
      onNewAlbum = (prevQuery, newData) => {
          // When we get data about a new album, we need to put in into an object 
          // with the same shape as the original query results, but with the new data added as well
          let updatedQuery = Object.assign({}, prevQuery);
          updatedQuery.listAlbums.items = prevQuery.listAlbums.items.concat([newData.onCreateAlbum]);
          return updatedQuery;
      }
  
      render() {
          return (
              <Connect 
                  query={graphqlOperation(ListAlbums)}
                  subscription={graphqlOperation(SubscribeToNewAlbums)} 
                  onSubscriptionMsg={this.onNewAlbum}
              >
                  {({ data, loading }) => {
                      if (loading) { return <div>Loading...</div>; }
                      if (!data.listAlbums) return;
                  return (
                    <div>
                      <AlbumsList albums={data.listAlbums.items}/>
                      <DeleteAllAlbums albums={data.listAlbums.items} />
                    </div>
                  );
                  }}
              </Connect>
          );
      }
}

class DeleteAllAlbums extends Component {
    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
    }
    onClick() {
      let promises = [];
      this.props.albums.forEach(album => {
        promises.push(API.graphql(graphqlOperation(DeleteAlbum, {id:album.id})));
      });
      Promise.all(promises).then(() => window.location.assign('/'));
    }
    render() {
      return (
      <Form.Button 
        data-test='deleteAll' 
        onClick = {this.onClick}
        icon='delete'
        content='Delete All Albums'
      />);
    }
}

export { 
    NewS3Photo,
    NewAlbum,
    AlbumsListLoader,
    AlbumDetailsLoader
};