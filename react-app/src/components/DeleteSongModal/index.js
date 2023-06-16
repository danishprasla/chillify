import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteSongThunk, getSongsThunk } from "../../store/songs";
import { authenticate } from "../../store/session";

const DeleteSongModal = ({ songId }) => {
  // console.log('song id inside modal --->',songId)
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const handleDeleteClick = async (e) => {
    e.preventDefault()
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


    <div>
      Deleting a song is permanent! Please confirm below.
      <button onClick={(e) => handleDeleteClick(e)}>
        Confirm
      </button>
      <button onClick={(e) => handleExitClick(e)}>
        Exit
      </button>
    </div>
  )

}

export default DeleteSongModal