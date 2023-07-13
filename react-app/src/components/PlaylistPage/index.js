import React, { useEffect, useRef, useState } from 'react'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { addSongToPlaylistThunk, deleteSongFromPlaylistThunk, getPlaylistsThunk } from '../../store/playlist';
import PostPlaylistModal from '../PostPlaylistModal';
import DeletePlaylistModal from '../DeletePlaylistModal';
import './PlaylistPage.css'
import { selectSong } from '../../store/selectedSong';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { addSongLike, removeSongLike } from "../../store/session";
import PageNotFound from '../PageNotFound';


// const audioLength = async (url) => {
//   let audio = new Audio();
//   audio.src = url;
//   await audio.load();
//   return audio.duration;
// }

function PlaylistPage() {

  const dispatch = useDispatch()
  const history = useHistory()

  const { playlistId } = useParams()
  // console.log(playlistId)
  const user = useSelector((state) => state.session.user)
  const playlists = useSelector((state) => state.playlists)
  const albums = useSelector((state) => state.albums)
  // console.log('ALBUMS !!@#!@#!@#',albums)
  const songs = useSelector((state) => state.songs)

  const [hoverPlay, setHoverPlay] = useState(null)

  //drop down code ->
  const [showMenu, setShowMenu] = useState(false)
  const [editMenu, setEditMenu] = useState(false)

  const ulRef = useRef()
  const editRef = useRef()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const openEditMenu = () => {
    if (editMenu) return;
    setEditMenu(true)
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  useEffect(() => {
    if (!editMenu) return;

    const closeEditMenu = (e) => {
      if (!editRef.current.contains(e.target)) {
        setEditMenu(false);
      }
    };

    document.addEventListener("click", closeEditMenu);

    return () => {
      document.removeEventListener("click", closeEditMenu);
    };
  }, [editMenu]);

  const closeMenu = () => setShowMenu(false);
  const closeEditMenu = () => setEditMenu(false)

  const dropDown = "song-dropdown-button" + (showMenu ? "" : " hidden");

  const editDropDown = "edit-menu-dropdown-button" + (editMenu ? "" : " hidden")



  if (Object.values(playlists).length == 0 || Object.values(songs).length == 0) {
    return (<h1>Loading...</h1>)
  }
  // console.log(playlistId)
  if (!playlists[playlistId]) {
    return (
      <PageNotFound />
    )
  }
  const playlist = playlists[parseInt(playlistId)]
  // console.log('playlist ----<',playlist.songs)
  const playlistSongs = playlist.songs
  const playlistLength = playlistSongs.length
  const userPlaylists = user.playlistIds
  // console.log('user playlist ids', userPlaylists)

  // console.log('PLAYLIST SONGS!!!', playlistSongs)


  return (
    <div>
      <div className='playlist-page-playlist-detail'>
        <img className='playlist-page-cover-img' src={playlist.coverImage} />
        <div className='playlist-detail-tile'>
          <div>Playlist</div>
          <h1 className='playlist-name'>{playlist.name}</h1>
          <div>

            <div className='playlist-spec-details'>
              {playlist.playlistOwner} · {playlistLength === 0 ? ("No songs") : playlistLength > 1 ? (`${playlistLength} songs`) : (`${playlistLength} song`)}

              {user.id === playlist.user && (
                <div onMouseLeave={closeEditMenu} className="edit-dropdown-container" onClick={openEditMenu}>
                  <i className="fa-solid fa-ellipsis" style={{ color: "#ffffff" }} />
                  <div className={editDropDown} ref={editRef}>
                    <div className='edit-playlist-modal-text'>
                      <OpenModalMenuItem
                        className='edit-playlist-button'
                        itemText='Edit this playlist'
                        modalComponent={<PostPlaylistModal formType={'edit'} playlist={playlist} />}
                      />
                    </div>
                    <div className='delete-playlist-modal-text'>
                      <OpenModalMenuItem
                        className='delete-playlist-button'
                        itemText="Delete this playlist"
                        modalComponent={<DeletePlaylistModal playlistId={playlistId} />}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
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
      <div className='songs-container'>
        {playlistSongs.map((songId, idx) => (
          <div
            key={`playlist-${songId}`}
            className='song-tile'
            onMouseEnter={() => setHoverPlay(idx)}
            onMouseLeave={() => setHoverPlay(null)}
          >
            {hoverPlay === idx ? (
              <div
                className='song-play-button'
                onClick={() => dispatch(selectSong(songs[songId], playlistSongs))}
              >
                <i className="fa-solid fa-play" style={{ color: "#7cd4fc" }} />
              </div>) :
              (<div className='song-list-num'>
                {idx + 1}
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
              <div className='album-title'>
                {songs[songId].albumId ? <div className='valid-album' onClick={() => history.push(`/albums/${songs[songId].albumId}`)}> {albums[songs[songId].albumId].name}</div> : '-'}
              </div>
              <div className='song-like-section' onMouseLeave={() => setShowMenu(false)}>
                <div className='liked-song'>
                  {(user.likedSongsIds).includes(songId) ? (
                    <i className="fa-solid fa-heart"
                      style={{ color: "#7cd4fc" }}
                      onClick={() => dispatch(removeSongLike(songId))} />
                  ) : (
                    <i className="fa-regular fa-heart"
                      onClick={() => dispatch(addSongLike(songId))} />
                  )}
                </div>
                <div className='song-drop-down' onClick={openMenu}>
                  {hoverPlay === idx && (
                    <i className="fa-solid fa-ellipsis" style={{ color: "#ffffff" }} />
                  )}
                </div>
                <div className='drop-down-wrapper-songs'>
                  {hoverPlay === idx && (
                    <div className={dropDown} ref={ulRef}>
                      {playlists[playlistId].user === user.id && (
                        <div
                          className='remove-from-playlist'
                          onClick={() => {
                            dispatch(deleteSongFromPlaylistThunk(playlistId, songId))
                            closeMenu()
                          }}
                        >
                          Remove from this playlist
                        </div>
                      )}
                      <div className='add-to-playlist-dropdown'>
                        Add to playlist:
                      </div>
                      <div className='drop-down-playlist-container'>
                        {userPlaylists.map(playlistIds => (
                          <div
                            className='playlist-drop-down-name'
                            key={`drop-down-playlist-${playlistIds}`}
                            onClick={() => {
                              dispatch(addSongToPlaylistThunk(playlistIds, songId))
                              closeMenu()
                            }}
                          >
                            {playlists[playlistIds].name}
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

        )}


      </div>

    </div>
  )
}

export default PlaylistPage