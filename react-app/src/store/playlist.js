const GET_PLAYLISTS = 'playlists/getAllPlaylists'

const getPlaylists = (playlists) => {
  return {
    type: GET_PLAYLISTS,
    playlists
  }
}

export const getPlaylistsThunk = () => async (dispatch) => {
  const res = await fetch('/api/playlists')
  const data = await res.json()

  if (res.ok) {
    dispatch(getPlaylists(data))
    return data
    //data should be {'playlists': []}
  }
  return null
}



const initialState = {};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYLISTS: {
      const newState = {...state}
      const playlistArr = action.playlists.playlists
      playlistArr.forEach((playlist) => {
        newState[playlist.id] = playlist
      })
      return newState
    }
    default:
      return state;
  }
}

export default playlistReducer