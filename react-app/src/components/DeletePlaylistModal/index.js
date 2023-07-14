import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePlaylistThunk, getPlaylistsThunk } from "../../store/playlist";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authenticate } from "../../store/session";

const DeletePlaylistModal = ({ playlistId }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal } = useModal()
  // console.log('playlist id inside modal --->', playlistId)

  const handleDeleteClick = async (e) => {
    e.preventDefault()
    // console.log('delete button pressed!!!!!')
    history.push('/')
    await dispatch(deletePlaylistThunk(playlistId))
    dispatch(getPlaylistsThunk())
    dispatch(authenticate())
    closeModal()
  }
  const handleExitClick = (e) => {
    e.preventDefault()
    closeModal()
  }
  return (


    <div className="delete-modal">
      <h2>
        Deleting a playlist is permanent! Please confirm below.
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

export default DeletePlaylistModal