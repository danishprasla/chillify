import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getGenreThunk } from "../../store/genre";


function GenrePage() {
  const { genreId } = useParams();
  const dispatch = useDispatch()

  const genres = useSelector((state) => state.genres)

  useEffect(()=> {
    dispatch(getGenreThunk())
  }, [dispatch])

  if (!genres) {
    return (
      <h1>Loading...</h1>
    )
  }
  const selectedGenre = genres[genreId]
  console.log(selectedGenre)

  return (
    <h1>
      This is the GenrePage {genreId}
      {(!selectedGenre.songIds.length) ? (
        <h2>
          This genre has no music
        </h2>

      ): (
        <div>
          <h2>Explore {selectedGenre.name} music</h2>
        </div>

      )}
    </h1>
  )
}

export default GenrePage