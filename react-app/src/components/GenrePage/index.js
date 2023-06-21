import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getGenreThunk } from "../../store/genre";
import { selectSong } from "../../store/selectedSong";
import { addSongToPlaylistThunk } from "../../store/playlist";
import { addSongLike, removeSongLike } from "../../store/session";


function GenrePage() {
  const { genreId } = useParams();
  const dispatch = useDispatch()

  const genres = useSelector((state) => state.genres)
  const songs = useSelector((state) => state.songs)
  const user = useSelector((state) => state.session.user)
  const playlists = useSelector((state) => state.playlists)

  const [hoverPlay, setHoverPlay] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const ulRef = useRef()
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const dropDown = "song-dropdown-button" + (showMenu ? "" : " hidden");

  // useEffect(()=> {
  //   dispatch(getGenreThunk())
  // }, [dispatch])

  // console.log('---->',genres)
  if (Object.values(genres).length == 0 || Object.values(songs).length == 0) {
    return (
      <h1>Loading...</h1>
    )
  }
  const selectedGenre = genres[genreId]
  // console.log('selected genre ', selectedGenre)
  const genreMusicIds = selectedGenre.songIds
  const userPlaylists = user.playlistIds

  return (
    <div>
      {(selectedGenre && !selectedGenre.songIds.length) ? (
        <h2>
          This genre has no music
        </h2>

      ) : (
        <div>

          <div className='playlist-page-playlist-detail'>
            <img className='playlist-page-cover-img' src={selectedGenre.genreCover} />
            <div>
              <div>Genre</div>
              <h1>Explore {selectedGenre?.name}</h1>
            </div>

          </div>
          <div className='songs-container-labels'>
            <div></div>
          </div>
          <div className='songs-container'>
            {genreMusicIds.map((songId, idx) => (
              <div
                key={`genre-${songId}`}
                className='song-tile'
                onMouseEnter={() => setHoverPlay(idx)}
                onMouseLeave={() => setHoverPlay(null)}
              >
                {hoverPlay === idx ? (
                  <div
                    className='song-play-button'
                    onClick={() => dispatch(selectSong(songs[songId], genreMusicIds))}
                  >
                    <i className="fa-solid fa-play" style={{ color: "#7cd4fc" }} />
                  </div>) :
                  (<div className='song-list-num' >
                    {idx + 1}
                  </div>)
                }
                <div>
                  <img className='song-image' src={songs[songId].coverPicture} />
                </div>
                <div className='song-description-container'>
                  <div className='song-description-name-artist'>
                    <div className='song-description-name'>
                      {songs[songId].songName}
                    </div>
                    <div className='song-description-author'>
                      {songs[songId].authorInfo.username}
                    </div>
                  </div>
                  <div className='song-like-section' onMouseLeave={() => setShowMenu(false)}>
                    <div className='liked-song'>
                      {(user.likedSongsIds).includes(songId) ? (
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: "#7cd4fc" }}
                          onClick={() => dispatch(removeSongLike(songId))}
                        />) : (
                        <i
                          className="fa-regular fa-heart"
                          onClick={() => dispatch(addSongLike(songId))}
                        />)}
                    </div>
                    <div className='song-drop-down' onClick={openMenu}>
                      {hoverPlay === idx && (
                        <i className="fa-solid fa-ellipsis" style={{ color: "#ffffff" }} />
                      )}
                    </div>
                    <div className='drop-down-wrapper-songs'>
                      {hoverPlay === idx && (
                        <div className={dropDown} ref={ulRef}>
                          <div className='add-to-playlist-dropdown'>
                            Add to playlist:
                          </div>
                          <div className='drop-down-playlist-container'>
                            {userPlaylists.map(playlistId => (
                              <div
                                className='playlist-drop-down-name'
                                key={`drop-down-genre-${playlistId}`}
                                onClick={() => {
                                  dispatch(addSongToPlaylistThunk(playlistId, songId))
                                  closeMenu()
                                }}
                              >
                                {playlists[playlistId].name}
                              </div>
                            ))}
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}


          </div>
        </div>



      )}
    </div>
  )
}

export default GenrePage