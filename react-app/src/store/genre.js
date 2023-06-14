const GET_GENRE = 'genre/getAllGenre'

const getGenre = (genres) => {
  return {
    type: GET_GENRE,
    genres
  }
}

export const getGenreThunk = () => async (dispatch) => {
  const res = await fetch('/api/genres')
  const data = await res.json()

  if (res.ok) {
    dispatch(getGenre(data))
    return data
    //data should be {'genres': []}
  }
  return null
}



const initialState = {};

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GENRE: {
      const newState = {...state}
      const genreArr = action.genres.genres
      genreArr.forEach((genre) => {
        newState[genre.id] = genre
      })
      return newState

    }
    default:
      return state;
  }
}

export default genreReducer