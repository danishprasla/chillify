import React, { useState } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { editPlaylistThunk, getPlaylistsThunk, postPlaylistThunk } from '../../store/playlist';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function PostPlaylistModal({ formType, playlist }) {

  let visibilityPlaylist = 'private'
  // console.log('PLAY LIST ---->', playlist)
  if (playlist) {
    if (playlist.public === false) visibilityPlaylist = 'private'
    else visibilityPlaylist = 'public'
  }
  console.log(visibilityPlaylist)

  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const [name, setName] = useState(playlist?.name || '')
  const [visibility, setVisibility] = useState(visibilityPlaylist)
  const [coverPicture, setCoverPicture] = useState(undefined)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState(false)
  const history = useHistory()

  // const user = useSelector(state => state.session.user)


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    let visibilityStatus = ''
    if (visibility === 'private') visibilityStatus = false
    else visibilityStatus = true

    // console.log(visibilityStatus)

    formData.append("name", name)
    if (coverPicture) formData.append("playlist_cover_url", coverPicture)
    formData.append("public", visibilityStatus)
    // console.log('form data --->', formData)
    setSubmitted(true)
    if (formType === 'edit') {
      const res = await dispatch(editPlaylistThunk(playlist.id, formData))
      if (res.errors) {
        setSubmitted(false)
        setErrors(true)
        return
      } else {
        closeModal()

      }

    }
    else {
      const res = await dispatch(postPlaylistThunk(formData))
      if (res.errors) {
        setSubmitted(false)
        setErrors(true)
        return
      } else {
        closeModal()
        // await dispatch(getPlaylistsThunk())
        return history.push(`/playlists/${res.id}`)
      }
    }
    // closeModal()
  }

  return (
    <div className='submit-playlist-modal'>
      {
        (formType === 'edit') ? <h1 className='formHeader'>Edit your Playlist </h1> :
          <h1 className="formHeader">Create a Playlist</h1>
      }
      {submitted && (
        <h3>Submitting playlist. Please wait...</h3>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Playlist Name:
          <input
            placeholder='Playlist name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Visibility:
          <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
            <option value='private'>Private</option>
            <option value='public'>Public</option>
          </select>

        </label>
        <label>
          Playlist cover picture:
          <input
            placeholder='insert file'
            type="file"
            accept='image/*'
            filename={coverPicture && coverPicture.name}
            onChange={(e) => setCoverPicture(e.target.files[0])}
          />
        </label>
        <button disabled={submitted}>
          {
            (formType === 'edit') ? "Edit Playlist" :
              "Create Playlist"
          }
        </button>

      </form>

    </div>
  )
}

export default PostPlaylistModal