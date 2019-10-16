const ListAlbums = `query ListAlbums {
    listAlbums(limit: 9999) {
        items {
            id
            name
        }
    }
}`;

const SubscribeToNewAlbums = `
  subscription OnCreateAlbum {
    onCreateAlbum {
      id
      name
    }
  }
`;


const GetAlbum = `query GetAlbum($id: ID!, $nextTokenForPhotos: String) {
  getAlbum(id: $id) {
  id
  name
  photos(sortDirection: DESC, nextToken: $nextTokenForPhotos) {
    nextToken
    items {
      id
      thumbnail {
        width
        height
        key
      }
    }
  }
}
}
`;

const UpdateAlbum = `mutation UpdateAlbum($id: ID!, $name: String) {
  updateAlbum(input:{
    id: $id
    name: $name
  }) {
    id
  }
}
`;

const DeleteAlbum = `mutation DeleteAlbum($id: ID!) {
  deleteAlbum(input:{
    id: $id
  }) {
    id
  }
}
`;

const NewPhoto = `mutation NewPhoto($bucket: String!, $fullsize: PhotoS3InfoInput!, $thumbnail: PhotoS3InfoInput!, $photoAlbumId: ID) {
  createPhoto(input:{
    bucket: $bucket
    fullsize: $fullsize
    thumbnail: $thumbnail
    photoAlbumId: $photoAlbumId
  }) {
    id
    bucket
  }
}
`;

export {
    ListAlbums,
    SubscribeToNewAlbums,
    GetAlbum,
    UpdateAlbum,
    DeleteAlbum,
    NewPhoto
};
