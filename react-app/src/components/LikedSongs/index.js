import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSong } from "../../store/selectedSong";
import './LikedSongs.css'
import { addSongToPlaylistThunk } from "../../store/playlist";
import { addSongLike, removeSongLike } from "../../store/session";

function LikedSongs() {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.session.user)
  const songs = useSelector((state) => state.songs)
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



  // console.log(user)
  const likedSongIds = user.likedSongsIds

  let likedSongIdsReversed = []

  for (let i = likedSongIds.length - 1; i >= 0; i--) {
    likedSongIdsReversed.push(likedSongIds[i])
  }
  const userPlaylists = user.playlistIds
  // console.log(likedSongIdsReversed)
  return (
    <div>
      <div>
        <div className='playlist-page-playlist-detail'>
          <div className='liked-songs-square-page'>
            <i className="fa-solid fa-heart fa-2xl" style={{ color: "#ffffff" }}></i>
          </div>
          <div className='playlist-detail-tile'>
            <div>Playlist</div>
            <h1 className='playlist-name'>Liked Songs</h1>
            <div>
              {user.username} · {likedSongIds.length === 0 ? ("No songs") : likedSongIds.length > 1 ? (`${likedSongIds.length} songs`) : (`${likedSongIds.length} song`)}
            </div>
          </div>

        </div>
        <div className='songs-container-labels'>
          <div className='songs-container-labels'>
            <div className='song-column-names'>
              <div className='track-num-title'>
                <div>
                  #
                </div>
                <div>
                  Title
                </div>
              </div>
              <div>
                Album
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
        <div className='songs-container'>
          {likedSongIds.map((songId, idx) => (
            <div
              key={`playlist-${songId}`}
              className='song-tile'
              onMouseEnter={() => setHoverPlay(idx)}
              onMouseLeave={() => setHoverPlay(null)}
            >
              {hoverPlay === idx ? (
                <div
                  className='song-play-button'
                  onClick={() => dispatch(selectSong(songs[songId], likedSongIdsReversed))}
                >
                  <i className="fa-solid fa-play" style={{ color: "#7cd4fc" }} />
                </div>) :
                (<div className='song-list-num'>
                  {likedSongIds.length - idx}
                </div>)
              }
              <div className='song-image-container'>
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
                              key={`drop-down-liked-${playlistId}`}
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
          )

          ).reverse()}


        </div>

      </div>
    </div>
  )

}

export default LikedSongs