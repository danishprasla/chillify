const SELECT_SONG = 'selectSong/SelectSong'

export const selectSong = (song, songIds) => {
  console.log('inside the action songIds:', songIds)
  return {
    type: SELECT_SONG,
    song,
    songIds
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
    default:
      return state;
  }
}

export default selectedSongReducer