const GET_ALL_SONGS = 'songs/getAllSongs'
const POST_SONG = 'songs/postSong'
const DELETE_SONG = 'songs/deleteSong'
const EDIT_SONG = 'songs/editSong'

const getSongs = (songs) => {
  return {
    type: GET_ALL_SONGS,
    songs
  }
}

const postSong = (song) => {
  return {
    type: POST_SONG,
    song
  }
}

const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    songId
  }

}

const editSong = (song) => {
  return {
    type: EDIT_SONG,
    song
  }
}

export const getSongsThunk = () => async (dispatch) => {
  const res = await fetch('/api/songs')
  const data = await res.json()

  if (res.ok) {
    dispatch(getSongs(data))
    return data
    //data should be {'songs': []}
  }
  return null
}

export const postSongThunk = (song) => async (dispatch) => {
  const res = await fetch('/api/songs/new', {
    method: "POST",
    body: song
  })
  const data = await res.json()
  if (res.ok) {
    dispatch(postSong(data))
    return data
  }
  return data
}

export const deleteSongThunk = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`, {
    method: "DELETE"
  })
  const data = await res.json()
  if (res.ok) {
    dispatch(deleteSong(songId))
    return false
  } else {
    return data
  }

}

export const editSongThunk = (songId, editData) => async (dispatch) => {
  const res = await fetch(`api/songs/${songId}/edit`, {
    method: 'PUT',
    body: editData
  })
  const data = await res.json()
  if (res.ok) {
    dispatch(editSong(data))
    return data
  } else {
    return data
  }
  
}



const initialState = {};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SONGS: {
      const newState = { ...state }
      const songsArr = action.songs.songs
      songsArr.forEach((song) => {
        newState[song.id] = song
      })
      return newState

    }
    case POST_SONG: {
      const newState = { ...state }
      newState[action.song.id] = action.song
      return newState
    }
    case EDIT_SONG: {
      const newState = {...state}
      newState[action.song.id] = action.song
      return newState
    }
    case DELETE_SONG: {
      const newState = { ...state }
      delete newState[action.songId]
      return newState
    }
    default:
      return state;
  }
}

export default songReducer