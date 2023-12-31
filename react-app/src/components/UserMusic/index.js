import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import PostSongModal from "../PostSongModal";
import DeleteSongModal from "../DeleteSongModal";
import { addSongToPlaylistThunk } from "../../store/playlist";
import { addSongLike, removeSongLike } from "../../store/session";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { selectSong } from "../../store/selectedSong";
import './UserMusic.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PostAlbumModal from "../CreateAlbum";

const MyMusic = () => {

  const history = useHistory()
  const user = useSelector((state) => state.session.user)
  const songs = useSelector((state) => state.songs)
  const playlists = useSelector((state) => state.playlists)
  const albums = useSelector((state) => state.albums)
  const [hoverPlay, setHoverPlay] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const ulRef = useRef()
  const selectedSong = useSelector((state) => state.selected.song)
  // console.log(selectedSong)
  
  const dispatch = useDispatch()
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

  if (Object.values(songs).length === 0) {
    return (
      <h1>
        Loading...
      </h1>
    )
  }

  const mySongIds = user.mySongs
  const userPlaylists = user.playlistIds
  const userAlbums = user.albumIds
  // console.log('SONG IDS FOR MINE!',mySongIds)

  return (
    <div>
      <div>
        <h1>
          Your Artist Page
        </h1>
        <h2> Your Published Albums</h2>
        {(!userAlbums.length) ? (
          <div className='user-album-tile'>
            <img className='album-image' src={'https://cdn.discordapp.com/attachments/1118303754714886259/1129447025285541939/HlHy9Yx.png'} />
            <h3 className="home-playlist-title"> No Albums </h3>
          </div>

        ) : (
          <div className="album-container">
            {userAlbums.map((album) => (
              <div className='user-album-tile' key={`album-${album}`} onClick={() => history.push(`/albums/${album}`)}>
                <img className='album-image' src={albums[album]?.coverPhoto} />
                <h3 className="home-playlist-title"> {albums[album]?.name} </h3>
              </div>
            ))}
          </div>

        )}
        <h2>
          Your Published Music
        </h2>
        <div>
          {user.username} · {mySongIds.length === 0 ? ("No songs") : mySongIds.length > 1 ? (`${mySongIds.length} songs`) : (`${mySongIds.length} song`)}
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
      <div className="songs-container">
        {mySongIds.map((songId, idx) => (
          <div
            key={`my-songs-${songId}`}
            className='song-tile'
            onMouseEnter={() => setHoverPlay(idx)}
            onMouseLeave={() => setHoverPlay(null)}
          >
            {hoverPlay === idx ? (
              <div
                className='song-play-button'
                onClick={() => dispatch(selectSong(songs[songId], mySongIds))}
              >
                <i className="fa-solid fa-play" style={{ color: "#7cd4fc" }} />
              </div>) :
              (<div className='song-list-num'>
                {mySongIds.length - idx}
              </div>)
            }
            <div className="song-image-container">
              <img className='song-image' src={songs[songId]?.coverPicture} />
            </div>
            <div className='song-description-container'>
              <div className='song-description-name-artist'>
                <div className='song-description-name'>
                  {songs[songId]?.songName}
                </div>
                <div className='song-description-author'>
                  {songs[songId]?.authorInfo.username}
                </div>
              </div>
              <div className='album-title'>
                {songs[songId]?.albumId ? <div className='valid-album' onClick={() => history.push(`/albums/${songs[songId]?.albumId}`)}> {albums[songs[songId]?.albumId]?.name}</div> : '-'}
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
                      <div className='user-songs-tools'>
                        <OpenModalMenuItem
                          className='user-songs-edit'
                          onItemClick={closeMenu}
                          itemText='Edit Song'
                          modalComponent={<PostSongModal song={songs[songId]} formType={'edit'} />}
                        />
                      </div>
                      <div className='user-songs-tools2'>
                        <OpenModalMenuItem
                          className='user-songs-delete'
                          onItemClick={closeMenu}
                          itemText='Delete Song'
                          modalComponent={<DeleteSongModal songId={songId} />}
                        />
                      </div>
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
        )

        ).reverse()}


      </div>
    </div>
  )

}

export default MyMusic