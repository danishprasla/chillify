import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGenreThunk } from "../../store/genre";
import './HomePage.css'
import { getPlaylistsThunk } from "../../store/playlist";


function HomePage() {
  const dispatch = useDispatch()
  const genres = useSelector((state) => state.genres)
  const user = useSelector((state) => state.session.user)
  const playlists = useSelector((state) => state.playlists)
  const history = useHistory()

  useEffect(() => {
    dispatch(getGenreThunk())
    dispatch(getPlaylistsThunk())
  }, [dispatch])
  let genresArr = []
  if (genres && user) {
    genresArr = Object.values(genres)
  } else {
    return (
      <h1> Loading ... </h1>
    )
  }
  console.log('user ------>', user)
  const playlistArr = Object.values(playlists)

  let userPlaylists = playlistArr.filter(playlist => playlist.user == user.id)
  console.log('user playlistsssssss ~~~~~~>', userPlaylists)



  return (
    <div>
      <div>
        <h2>Your playlists:</h2>
        {(!user.playlistIds.length) ? (
          <div>
            You don't currently have any playlists start by clicking below to make your first one!
          </div>

        ) : (
          <div className="home-playlist-container">
            {userPlaylists.map((playlist) => (
              <div className='home-playlist-tile' key={playlist.id}>
                <img className='home-playlist-image'src={playlist.coverImage} />
                <h3> {playlist.name} </h3>
              </div>
            ))}
          </div>

        )}

      </div>

      <h2>
        Explore Genres and Discover New Music
      </h2>
      <div className="genres-container-wrapper">

        <div className="genres-container">
          {genresArr.map((genre) => (
            <div className='genre-tile' onClick={() => history.push(`/genre/${genre.id}`)} key={genre.name}>
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