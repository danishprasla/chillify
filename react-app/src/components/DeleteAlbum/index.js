import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteSongThunk, getSongsThunk } from "../../store/songs";
import { authenticate } from "../../store/session";
import { selectSong } from "../../store/selectedSong";
import { deleteAlbumThunk, getAlbumsThunk } from "../../store/album";

const DeleteAlbumModal = ({ albumId }) => {
  // console.log('song id inside modal --->',albumId)
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal } = useModal()
  const selectedAlbumId = useSelector((state) => state.selected.song?.albumId)
  // console.log(selectedSong)

  const handleDeleteClick = async (e) => {
    e.preventDefault()
    history.push('/my-music')
    if (albumId == selectedAlbumId) {
      // console.log('in here')
      await dispatch(selectSong(undefined, undefined))
    }
    await dispatch(deleteAlbumThunk(albumId))
    await dispatch(getAlbumsThunk())
    await dispatch(authenticate())
    await dispatch(getSongsThunk())
    closeModal()
  }
  const handleExitClick = (e) => {
    e.preventDefault()
    closeModal()
  }
  return (


    <div className="delete-modal">
      <h2>
        Deleting an album is permanent! Deleting an album will also delete associated songs. Please confirm below.
      </h2>
      <button className="confirm-delete-button" onClick={(e) => handleDeleteClick(e)}>
        Confirm
      </button>
      <button className='exit-delete-button' onClick={(e) => handleExitClick(e)}>
        Exit
      </button>
    </div>
  )

}

export default DeleteAlbumModal