import React from 'react'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import * as sessionActions from "../../store/session";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function PlaylistPage() {

  const dispatch = useDispatch()

  const { playlistId } = useParams()
  // console.log(playlistId)

  return (
    <div>
      This is playlist {playlistId} page
    </div>
  )
}

export default PlaylistPage