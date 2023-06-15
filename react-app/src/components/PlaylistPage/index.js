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

function PlaylistPage() {

  // const dispatch = useDispatch()

  const { playlistId } = useParams()
  // console.log(playlistId)
  const user = useSelector((state) => state.session.user)
  const playlists = useSelector((state) => state.playlists)
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
  // console.log('playlist ----<',playlist)


  return (
    <div>
      This is playlist {playlistId} page
      {user.id === playlist.user && (
        <div>
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

    </div>
  )
}

export default PlaylistPage