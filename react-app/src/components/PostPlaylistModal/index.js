import React, { useEffect, useState } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { editPlaylistThunk, getPlaylistsThunk, postPlaylistThunk } from '../../store/playlist';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './PostModal.css'

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
  const [errObj, setErrObj] = useState({})
  const history = useHistory()

  // const user = useSelector(state => state.session.user)
  useEffect(() => {
    let errors = {}
    if (name > 100) {
      errors.name = 'Name must be less than 100 characters'
    }
    if (name < 5) {
      errors.name = 'Name must be greater than 5 characters'
    }
    if (!coverPicture && formType !== 'edit') {
      errors.coverPicture = 'You must add a cover picture for your playlist'
    }

    setErrObj(errors)

  }, [name, coverPicture])


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
      {(submitted && !errors) && (
        <div className='loading-field-submit'>
          <h5>Submitting playlist. Please wait...</h5>
          <img className='form-loading-gif' src="https://cdn.discordapp.com/attachments/1118303754714886259/1120728549461082173/Pulse-1s-201px.gif" />
        </div>
      )}
      <form className='playlist-form' onSubmit={handleSubmit}>
        <label>
          Playlist Name:
          {(errors && errObj.name) && (
            <p className='form-error-message'>{errObj.name}</p>
          )}
          <input
            placeholder='Playlist name'
            type="text"
            className='form-text-name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Visibility:
          <select className='visibility-form' value={visibility} onChange={(e) => setVisibility(e.target.value)}>
            <option value='private'>Private</option>
            <option value='public'>Public</option>
          </select>

        </label>
        <label>
          <div>
            Playlist Cover Picture:
          </div>
          {(errors && errObj.coverPicture) && (
            <p className='form-error-message'>{errObj.coverPicture}</p>
          )}
          <input
            className='playlist-file-field'
            placeholder='insert file'
            type="file"
            accept='image/*'
            filename={coverPicture && coverPicture.name}
            onChange={(e) => setCoverPicture(e.target.files[0])}
          />

        </label>
        <button className='submit-button' disabled={submitted}>
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