import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import { NewAlbum, AlbumsListLoader, NewS3Photo, AlbumDetailsLoader } from './album';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class App extends Component {
  render() {
    return (
      <Router>
        <Grid padded>
          <Grid.Column>
            <Route path="/" exact component={NewAlbum}/>
            <Route path="/" exact component={AlbumsListLoader}/>
            <Route path="/" exact component={NewS3Photo}/>
            <Route
              path="/albums/:albumId"
              render={ () => <NavLink data-test='back-to-album-link' to='/'>Back to Albums list</NavLink> }
            />
            <Route
              path="/albums/:albumId"
              render={ props => <AlbumDetailsLoader id={props.match.params.albumId}/> }
            />
          </Grid.Column>
        </Grid>
      </Router>
    );
  }
}

export default withAuthenticator(App, {includeGreetings: true});