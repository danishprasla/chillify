import React from 'react'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getPlaylistsThunk } from '../../store/playlist';
import PostPlaylistModal from '../PostPlaylistModal';
import DeletePlaylistModal from '../DeletePlaylistModal';
import './PlaylistPage.css'

function PlaylistPage() {

  // const dispatch = useDispatch()

  const { playlistId } = useParams()
  // console.log(playlistId)
  const user = useSelector((state) => state.session.user)
  const playlists = useSelector((state) => state.playlists)
  const songs = useSelector((state) => state.songs)
  // if (Object.values(playlists).length == 0) {
  //   console.log('inside if conditional')
  //   dispatch(getPlaylistsThunk())
  // }
  // console.log(user)
  // console.log(playlists)
  if (Object.values(playlists).length == 0) {
    return (<h1>Loading...</h1>)
  }
  // console.log(playlistId)
  const playlist = playlists[parseInt(playlistId)]
  // console.log('playlist ----<',playlist.songs)
  const playlistSongs = playlist.songs
  const playlistLength = playlistSongs.length


  return (
    <div>
      <div className='playlist-page-playlist-detail'>
        <img className='playlist-page-cover-img' src={playlist.coverImage} />
        <div>
          <div>Playlist</div>
          <h1>{playlist.name}</h1>
          <div>
            {playlist.playlistOwner} · {playlistLength} songs
          </div>
        </div>

      </div>
      {user.id === playlist.user && (
        <div className='playlist-page-buttons'>
          <OpenModalButton
            className='delete-playlist-button'
            buttonText="Delete this playlist"
            modalComponent={<DeletePlaylistModal playlistId={playlistId} />}
          />
          <OpenModalButton
            className='edit-playlist-button'
            buttonText='Edit this playlist'
            modalComponent={<PostPlaylistModal formType={'edit'} playlist={playlist} />}
          />
        </div>
      )}
      <div className='songs-container-labels'>
        <div></div>
      </div>
      <div className='songs-container'>
        {playlistSongs.map((songId, idx) => (
          <div className='song-tile'>
            <div>
              {idx + 1}
            </div>
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
              <div>
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