const GET_PLAYLISTS = 'playlists/getAllPlaylists'
const POST_PLAYLIST = 'playlist/postPlaylist'
const DELETE_PLAYLIST = 'playlist/deletePlaylist'
const EDIT_PLAYLIST = 'playlist/editPlaylist'
const POST_SONG_TO_PLAYLIST = 'playlist/addSong'
const DELETE_SONG_FROM_PLAYLIST = 'playlist/deleteSong'

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

const deletePlaylist = (playlistId) => {
  return {
    type: DELETE_PLAYLIST,
    playlistId
  }
}

const editPlaylist = (playlist) => {
  return {
    type: EDIT_PLAYLIST,
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

export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
  // console.log('INSiDE DELETE THUNK!!!!!!!!', playlistId)
  const res = await fetch(`/api/playlists/${playlistId}`, {
    method: 'DELETE'
  })
  if (res.ok) {
    // console.log('SUCCESSFUL DELETE RESPONSE????')
    dispatch(deletePlaylist(playlistId))
    return false
  } else {
    // console.log('UNSUCCESSFUL????!?!?!?!?')
    return { 'errors': 'error deleting playlist' }
  }
}

export const editPlaylistThunk = (playlistId, editData) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlistId}/edit`, {
    method: 'PUT',
    body: editData
  })
  const data = await res.json()
  if (res.ok) {
    dispatch(editPlaylist(data))
    return data
  } else {
    return data
  }

}
export const addSongToPlaylistThunk = (playlistId, songId) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlistId}/song/${songId}/add`, {
    method: 'POST'
  })
  const data = await res.json()
  if (res.ok) {
    dispatch(getPlaylistsThunk())
    return data
  } else {
    return data
  }
}
export const deleteSongFromPlaylistThunk = (playlistId, songId) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlistId}/song/${songId}/delete`, {
    method: 'DELETE'
  })
  const data = await res.json()
  if (res.ok) {
    dispatch(getPlaylistsThunk())
    return data
  } else {
    return data
  }
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
    case EDIT_PLAYLIST: {
      const newState = { ...state }
      newState[action.playlist.id] = action.playlist
      return newState
    }
    case POST_PLAYLIST: {
      const newState = { ...state }
      newState[action.playlist.id] = action.playlist
      return newState
    }
    case DELETE_PLAYLIST: {
      const newState = { ...state }
      delete newState[action.playlistId]
      return newState
    }

    default:
      return state;
  }
}

export default playlistReducer