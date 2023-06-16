import React, { useState } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { editPlaylistThunk, getPlaylistsThunk, postPlaylistThunk } from '../../store/playlist';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getSongsThunk, postSongThunk } from '../../store/songs';
import { authenticate } from '../../store/session';

function PostSongModal({ formType, song }) {

  const dispatch = useDispatch()
  console.log(song)
  const { closeModal } = useModal();
  const [name, setName] = useState(song?.songName || '')
  const [coverPicture, setCoverPicture] = useState(undefined)
  const [audioFile, setAudioFile] = useState(undefined)
  const [genre, setGenre] = useState(song?.genre || 1)
  const [releaseDate, setReleaseDate] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState(false)


  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    // console.log('REACT GENRE ID FOR CLASSSICAL', genre)
    formData.append('song_name', name)
    formData.append('song_cover_photo', coverPicture)
    formData.append('song_url', audioFile)
    formData.append('genre_id', parseInt(genre))
    formData.append('release_date', releaseDate)
    setSubmitted(true)
    if (formType === 'edit') {

    } else {
      // do posting here
      // console.log('inside if conditional for posting')
      const res = await dispatch(postSongThunk(formData))
      if (res.errors) {
        setSubmitted(false)
        setErrors(true)
        return
      } else {
        // console.log('inside successful route (last step)')
        await dispatch(getSongsThunk())
        dispatch(authenticate())
        // dispatch(sessionActions.authenticate())
        closeModal()
        // await dispatch(getPlaylistsThunk())
      }
    }
  }

  return (
    <div className='song-modal-form-container'>
      {
        (formType === 'edit') ? <h1 className='formHeader'>Edit your Song </h1> :
          <h1 className="formHeader">Post your Song</h1>
      }
      {submitted && (
        <h3>Submitting song. Please wait...</h3>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Song name:
          <input
            placeholder='Enter your song name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Genre
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value={1}>Classical</option>
            <option value={2}>Video Game Soundtracks</option>
            <option value={3}>Anime Lo-fi</option>
            <option value={4}>Lo-fi</option>
            <option value={5}>DOOM</option>
          </select>
        </label>
        <label>
          Release Date
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />

        </label>
        <label>
          Cover Image:
          <input
            placeholder='insert file'
            type="file"
            accept='image/*'
            filename={coverPicture && coverPicture.name}
            onChange={(e) => setCoverPicture(e.target.files[0])}
          />
        </label>
        <label>
          Audio File:
          <input
            placeholder='insert file'
            type="file"
            accept='audio/*'
            filename={audioFile && audioFile.name}
            onChange={(e) => setAudioFile(e.target.files[0])}
          />
        </label>
        <button disabled={submitted}>
          {
            (formType === 'edit') ? "Edit your Song" :
              "Post your Song"
          }
        </button>
      </form>
    </div>
  )
}

export default PostSongModal