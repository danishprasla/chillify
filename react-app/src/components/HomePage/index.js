import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGenreThunk } from "../../store/genre";
import './HomePage.css'
import { getPlaylistsThunk } from "../../store/playlist";
import OpenModalButton from "../OpenModalButton";
import PostPlaylistModal from "../PostPlaylistModal";


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
  // console.log('user ------>', user)
  const playlistArr = Object.values(playlists)

  let userPlaylists = playlistArr.filter(playlist => playlist.user == user.id)
  // console.log('user playlistsssssss ~~~~~~>', userPlaylists)

  const publicPlaylists = playlistArr.filter(playlist => playlist.public === true && playlist.user !== user.id)

  console.log('PUBLIC PLAYLISTS ~~~~>', publicPlaylists)



  return (
    <div>
      <div>
        <h1>Welcome back, {user.username}</h1>
        <h2>Your playlists:</h2>
        {/* <OpenModalButton
          className='create-playlist-button'
          buttonText="Create a Playlist"
          modalComponent={<PostPlaylistModal />} /> */}
        {(!user.playlistIds.length) ? (
          <div>
            Looks like you currently have no playlists!
          </div>

        ) : (
          <div className="home-playlist-container">
            {userPlaylists.map((playlist) => (
              <div className='home-playlist-tile' key={playlist.id} onClick={() => history.push(`/playlists/${playlist.id}`)}>
                <img className='home-playlist-image' src={playlist.coverImage} />
                <h3 className="home-playlist-title"> {playlist.name} </h3>
              </div>
            ))}
          </div>

        )}

      </div>

      <h2>
        Explore Genres and Discover New Music:
      </h2>
      <div className="genres-container-wrapper">

        <div className="genres-container">
          {genresArr.map((genre) => (
            <div className='genre-tile' onClick={() => history.push(`/genre/${genre.id}`)} key={genre.name}>
              <img className='genre-image' src={genre.genreCover} alt={genre.name} />
              <h3 className="home-genre-title">
                {genre.name}
              </h3>
            </div>

          ))}

        </div>

      </div>

      <h2>
        Public playlists made by other users:
      </h2>
      <div className="home-playlist-container">
        {publicPlaylists.map((playlist) => (
          <div className='home-playlist-tile' key={playlist.id} onClick={() => history.push(`/playlists/${playlist.id}`)}>
            <img className='home-playlist-image' src={playlist.coverImage} />
            <h3 className="home-playlist-title"> {playlist.name} </h3>
            {/* <h5 className="playlist-owner">
              {playlist.playlistOwner}
            </h5> */}
          </div>
        ))}
      </div>
    </div>
  )

}

export default HomePage