import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editAlbumThunk, getAlbumsThunk, postAlbumThunk } from "../../store/album";
import { authenticate } from "../../store/session";
import { useModal } from "../../context/Modal";


function PostAlbumModal({ formType, album }) {
  const dispatch = useDispatch()
  const [submitted, setSubmitted] = useState(false)
  // const [genre, setGenre] = useState(album?.genreId || 1)
  const [name, setName] = useState(album?.name || '')
  const [albumPhoto, setAlbumPhoto] = useState(undefined)
  const [errors, setErrors] = useState(false)
  const [errObj, setErrObj] = useState({})
  const { closeModal } = useModal()

  useEffect(() => {
    let errors = {}
    if (name.length > 50) {
      errors.name = 'Album name must be less than 60 characters'
    }
    if (name.length < 3) {
      errors.name = 'Album name must be at least 3 characters'
    }
    if (!albumPhoto && formType !== 'edit') {
      errors.photo = 'You must attach a cover photo for your album'
    }
    setErrObj(errors)

  }, [name, albumPhoto])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    if (albumPhoto) {
      formData.append('album_cover_photo', albumPhoto)
    }
    // formData.append('genre_id', parseInt(genre))
    setSubmitted(true)
    if (Object.values(errObj).length > 0) {
      setErrors(true)
      setSubmitted(false)
      return
    } else {
      if (formType === 'edit') {
        const res = await dispatch(editAlbumThunk(album.id, formData))
        if (res.errors) {
          setSubmitted(false)
          setErrors(true)
          console.log(res.errors)
          setErrObj({'serverError': 'Server Error. Please try again later'})
          return
        } else {
          closeModal()
        }

      } else {
        const res = await dispatch(postAlbumThunk(formData))
        if (res.errors) {
          setSubmitted(false)
          setErrors(true)
          setErrObj({'serverError': 'Server Error. Please try again later'})
          return
        } else {
          await dispatch(authenticate())
          closeModal()
        }
      }
    }

  }
  return (
    <div className="submit-album-modal">
      {
        (formType === 'edit') ? <h1 className='form-header'>Edit your Album </h1> :
          <h1 className="form-header">Create an Album</h1>
      }
      {(errors && errObj.serverError) && (
            <p className='form-error-message'>{errObj.serverError}</p>
          )}
      <form
        className="album-form"
        onSubmit={handleSubmit}
      >
        <label>
          Album Name:
          {(errors && errObj.name) && (
            <p className='form-error-message'>{errObj.name}</p>
          )}
          <input
            className="form-text-name"
            placeholder="Enter your album name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* <label>
          Genre
          <select className='select-genre' value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value={1}>Classical</option>
            <option value={2}>Video Game Soundtracks</option>
            <option value={3}>Anime Lo-fi</option>
            <option value={4}>Lo-fi</option>
            <option value={5}>DOOM</option>
          </select>
        </label> */}
        <label>
          Album Cover Image:
          {(errors && errObj.photo) && (
            <p className='form-error-message'>{errObj.photo}</p>
          )}
          <input
            className='file-field'
            placeholder='insert file'
            type="file"
            accept='image/*'
            filename={albumPhoto && albumPhoto.name}
            onChange={(e) => setAlbumPhoto(e.target.files[0])}
          />
        </label>


        <button className='submit-button' disabled={submitted}>
          {
            (formType === 'edit') ? "Edit Album" :
              "Create Album"
          }
        </button>
      </form>

    </div>
  )
}

export default PostAlbumModal