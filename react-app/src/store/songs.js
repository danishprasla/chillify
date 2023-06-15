const GET_ALL_SONGS = 'songs/getAllSongs'
const POST_SONG = 'songs/postSong'

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
    }
    default:
      return state;
  }
}

export default songReducer