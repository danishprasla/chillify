const SELECT_SONG = 'selectSong/SelectSong'
const CHANGE_SELECT_SONG = 'selectSong/changeSelectSong'

export const selectSong = (song, songIds) => {
  console.log('inside the action songIds:', songIds)
  return {
    type: SELECT_SONG,
    song,
    songIds
  }
}

export const selectSongChange = (song) => {
  return {
    type: CHANGE_SELECT_SONG,
    song
  }
}




const initialState = { song: null, songIds: [] };
const selectedSongReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SONG: {
      const { song, songIds } = action
      const newState = { ...state, song, songIds }
      return newState
    }
    case CHANGE_SELECT_SONG: {
      const song = action.song
      const newState = { ...state, song}
      return newState
    }
    default:
      return state;
  }
}

export default selectedSongReducer