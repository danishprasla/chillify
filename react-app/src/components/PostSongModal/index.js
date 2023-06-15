import React, { useState } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { editPlaylistThunk, getPlaylistsThunk, postPlaylistThunk } from '../../store/playlist';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function PostSongModal({ formType, song }) {

  return (
    <div className='song-modal'>
      This is the song modal
    </div>
  )
}

export default PostSongModal