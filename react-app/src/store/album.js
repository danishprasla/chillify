const GET_ALBUMS = 'albums/getAllAlbums'

const getAlbums = (albums) => {
  return {
    type: GET_ALBUMS,
    albums
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
    default:
      return state;
  }
}

export default albumReducer