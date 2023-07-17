import React, { useEffect, useState } from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { editPlaylistThunk, getPlaylistsThunk, postPlaylistThunk } from '../../store/playlist';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { editSongThunk, getSongsThunk, postSongThunk } from '../../store/songs';
import { authenticate } from '../../store/session';

import './PostSong.css'
import { getAlbumsThunk } from '../../store/album';

const dateFormater = (date) => {
  const months = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
  }
  let split1 = date.split(", ")
  let [day, month, year, time, tz] = split1[1].split(" ")

  month = months[month]

  return `${year}-${month}-${day}`
}

function PostSongModal({ formType, song }) {

  const dispatch = useDispatch()
  // console.log('date --->', dateFormater(song.releaseDate))

  let editDate = null
  if (formType === 'edit') {
    editDate = dateFormater(song.releaseDate)
  }
  // console.log('edit date --->', editDate)
  // console.log('SONG FROM EDIT OPT',song)


  const { closeModal } = useModal();
  const [name, setName] = useState(song?.songName || '')
  const [coverPicture, setCoverPicture] = useState(undefined)
  const [audioFile, setAudioFile] = useState(undefined)
  const [genre, setGenre] = useState(song?.genre || 1)
  const [releaseDate, setReleaseDate] = useState(editDate || '')
  const [albumId, setAlbumId] = useState(song?.albumId || undefined)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState(false)
  const [errObj, setErrObj] = useState({})


  const history = useHistory()
  const userAlbums = useSelector(state => state.session.user.albumIds)
  // console.log(userAlbums)
  const allAlbums = useSelector(state => state.albums)
  console.log(allAlbums)

  useEffect(() => {
    let err = {}
    if (name.length > 60) {
      err.name = 'Name must be less than 60 characters'
    }
    if (name.length < 3) {
      err.name = 'Name must be greater than 3 characters'
    }
    if (!audioFile && formType !== 'edit') {
      err.audio = 'You must attach an audio file'
    }
    if (!coverPicture && formType !== 'edit') {
      err.coverPicture = 'You must attach a cover picture for your song'
    }
    setErrObj(err)
    console.log(albumId)

  }, [name, coverPicture, audioFile, genre, releaseDate, albumId])

  let today = new Date()
  let day = today.getDate()
  let month = today.getMonth() + 1
  let year = today.getFullYear()

  if (month < 10) {
    month = `0${month}`
  }
  if (day < 10) {
    day = `0${day}`
  }

  let maxDate = `${year}-${month}-${day}`
  // console.log('max date ------>', maxDate)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    // console.log('REACT GENRE ID FOR CLASSSICAL', genre)
    formData.append('song_name', name)
    if (coverPicture) {
      formData.append('song_cover_photo', coverPicture)
    }
    if (audioFile) {
      formData.append('song_url', audioFile)
    }
    if (!releaseDate) {
      formData.append('release_date', maxDate)
    } else {
      formData.append('release_date', releaseDate)
    }
    if (albumId) {
      console.log('album added')
      formData.append('album_id', parseInt(albumId))
    }
    formData.append('genre_id', parseInt(genre))
    setSubmitted(true)
    if (Object.values(errObj).length > 0) {
      setErrors(true)
      setSubmitted(false)
      return
    } else {

      if (formType === 'edit') {
        const res = await dispatch(editSongThunk(song.id, formData))
        // console.log('res from edit cond', res)
        if (res.errors) {
          setSubmitted(false)
          setErrors(true)
          return
        } else {
          await dispatch(authenticate())
          dispatch(getAlbumsThunk())
          closeModal()
        }

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
          //dispatch getSongs to get the updated song state
          await dispatch(authenticate())
          await dispatch(getAlbumsThunk())
          // dispatch user state to get updated user state including user songs which should include all of a user's music
          closeModal()
          // await dispatch(getPlaylistsThunk())
        }
      }
    }
  }

  return (
    <div className='song-modal-form-container'>
      {
        (formType === 'edit') ? <h1 className='form-header'>Edit your Song </h1> :
          <h1 className="form-header">Post your Song</h1>
      }
      {(submitted && !errors) && (
        <div className='loading-field-submit'>
          <h5>Submitting song. Please wait...</h5>
          <img className='form-loading-gif' src="https://cdn.discordapp.com/attachments/1118303754714886259/1120728549461082173/Pulse-1s-201px.gif" />
        </div>
      )}
      <form className='song-form' onSubmit={handleSubmit}>
        <label>
          Song name:
          {(errors && errObj.name) && (
            <p className='form-error-message'>{errObj.name}</p>
          )}
          <input
            className='form-text-name'
            placeholder='Enter your song name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Add to album:
          <select className='select-genre' value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
            <option value={undefined}>{userAlbums.length > 0 ? "Single - no album" : "No albums"}</option>
            {userAlbums.map((id) => (
              <option key={`album-dropdown-id-${id}`} value={id}>{allAlbums[id].name}</option>
            ))}
          </select>
        </label>
        <label>
          Genre:
          <select className='select-genre' value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value={1}>Classical</option>
            <option value={2}>Video Game Soundtracks</option>
            <option value={3}>Anime Lo-fi</option>
            <option value={4}>Lo-fi</option>
            <option value={5}>DOOM</option>
          </select>
        </label>
        <label>
          Release Date:
          <input
            className='release-date-field'
            type="date"
            max={maxDate}
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />

        </label>
        <label>
          Cover Image:
          {(errors && errObj.coverPicture) && (
            <p className='form-error-message'>{errObj.coverPicture}</p>
          )}
          <input
            className='file-field'
            placeholder='insert file'
            type="file"
            accept='image/*'
            filename={coverPicture && coverPicture.name}
            onChange={(e) => setCoverPicture(e.target.files[0])}
          />
        </label>
        <label>
          Audio File:
          {(errors && errObj.audio) && (
            <p className='form-error-message'>{errObj.audio}</p>
          )}
          <input
            className='file-field'
            placeholder='insert file'
            type="file"
            accept='.mp3, .wav'
            filename={audioFile && audioFile.name}
            onChange={(e) => setAudioFile(e.target.files[0])}
          />
        </label>
        <button className='submit-button' disabled={submitted}>
          {
            (formType === 'edit') ? "Submit Edit" :
              "Submit Song"
          }
        </button>
      </form>
    </div>
  )
}

export default PostSongModal