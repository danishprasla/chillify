import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteSongThunk, getSongsThunk } from "../../store/songs";
import { authenticate } from "../../store/session";
import './DeleteSong.css'
import { selectSong } from "../../store/selectedSong";

const DeleteSongModal = ({ songId }) => {
  // console.log('song id inside modal --->',songId)
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const selectedSongId = useSelector((state) => state.selected.song?.id)
  // console.log(selectedSong)

  const handleDeleteClick = async (e) => {
    e.preventDefault()
    if (songId == selectedSongId) {
      // console.log('in here')
      await dispatch(selectSong(undefined, undefined))
    }
    await dispatch(deleteSongThunk(songId))
    dispatch(authenticate())
    dispatch(getSongsThunk())
    closeModal()
  }
  const handleExitClick = (e) => {
    e.preventDefault()
    closeModal()
  }
  return (


    <div className="delete-modal">
      <h2>
        Deleting a song is permanent! Please confirm below.
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

export default DeleteSongModal