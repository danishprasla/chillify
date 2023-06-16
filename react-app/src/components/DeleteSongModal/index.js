import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DeleteSongModal = ({ songId }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  console.log('playlist id inside modal --->',playlistId)

  const handleDeleteClick = async (e) => {
    e.preventDefault()
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