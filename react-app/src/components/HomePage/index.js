import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGenreThunk } from "../../store/genre";
import './HomePage.css'


function HomePage() {
  const dispatch = useDispatch()
  const genres = useSelector((state) => state.genres)
  const history = useHistory()

  useEffect(() => {
    dispatch(getGenreThunk())

  }, [dispatch])
  let genresArr = []
  if (genres) {
    genresArr = Object.values(genres)
  } else {
    return (
      <h1> Loading ... </h1>
    )
  }


  return (
    <div>
      <h2>
        Explore Genres and Discover New Music
      </h2>
      <div className="genres-container-wrapper">

        <div className="genres-container">
          {genresArr.map((genre) => (
            <div className='genre-tile' key={genre.name}>
              <img className='genre-image' src={genre.genreCover} alt={genre.name} />
              <h3 className="genre-title">
                {genre.name}
              </h3>
            </div>

          ))}

        </div>

      </div>
    </div>
  )

}

export default HomePage