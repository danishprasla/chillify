const GET_ALBUMS = 'albums/getAllAlbums'
const POST_ALBUM = 'albums/postAlbum'

const getAlbums = (albums) => {
  return {
    type: GET_ALBUMS,
    albums
  }
}

const postAlbum = (album) => {
  return {
    type: POST_ALBUM,
    album
  }

}

export const getAlbumsThunk = () => async (dispatch) => {
  const res = await fetch('/api/albums')
  const data = await res.json()

  if (res.ok) {
    dispatch(getAlbums(data))
    return data
    //data should be {'albums': []}
  }
  return null
}
export const postAlbumThunk = (album) => async (dispatch) => {
  const res = await fetch('/api/albums/new', {
    method: "POST",
    body: album
  })
  const data = await res.json()
  if (res.ok) {
    dispatch(postAlbum(data))
    return data
  }
  return data
}



const initialState = {};

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUMS: {
      const newState = {...state}
      const albumsArr = action.albums.albums
      albumsArr.forEach((album) => {
        newState[album.id] = album
      })
      return newState
    }
    case POST_ALBUM: {
      const newState = {...state}
      newState[action.album.id] = action.album
      return newState
    }
    default:
      return state;
  }
}

export default albumReducer