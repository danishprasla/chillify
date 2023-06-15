const GET_PLAYLISTS = 'playlists/getAllPlaylists'
const POST_PLAYLIST = 'playlist/postPlaylist'

const getPlaylists = (playlists) => {
  return {
    type: GET_PLAYLISTS,
    playlists
  }
}

const postPlaylist = (playlist) => {
  return {
    type: POST_PLAYLIST,
    playlist
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

export const postPlaylistThunk = (playlist) => async (dispatch) => {
  const res = await fetch("/api/playlists/new", {
    method: "POST",
    body: playlist
  })
  const data = await res.json()
  if (res.ok) {
    dispatch(postPlaylist(data))
    return data
  }
  return data
}



const initialState = {};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYLISTS: {
      const newState = { ...state }
      const playlistArr = action.playlists.playlists
      playlistArr.forEach((playlist) => {
        newState[playlist.id] = playlist
      })
      return newState
    }
    case POST_PLAYLIST: {
      const newState = { ...state }
      newState[action.playlist.id] = action.playlist
      return newState
    }
    default:
      return state;
  }
}

export default playlistReducer