import React, { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';
import './Player.css'
import { useDispatch, useSelector } from "react-redux";
import { selectSongChange } from "../../store/selectedSong";


function Player() {

  const [playing, setPlaying] = useState(false)
  const [songLength, setSongLength] = useState(0)
  const [songSpotTime, setSongSpotTime] = useState(0)
  const [songUrl, setSongUrl] = useState('')
  const [seekerBar, setSeekerBar] = useState(0)
  const [songIndex, setSongIndex] = useState(0)
  const [loop, setLoop] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [volume, setVolume] = useState(50)

  const dispatch = useDispatch()
  const selected = useSelector((state) => state.selected)
  const songs = useSelector((state) => state.songs)
  const selectedPlaylist = selected.songIds
 

  const player = useRef()


  useEffect(() => {
    if (selected.song) {
      setSongUrl(selected.song.songUrl)
      setSongIndex(selectedPlaylist.indexOf(selected?.song?.id))
    }
    else {
      setSongUrl("")
      setPlaying(false)
      return
    }
  }, [selected])


  useEffect(() => {
    if (songSpotTime == songLength) {
      if (shuffle) {
        let randomIndex = Math.floor(Math.random() * selectedPlaylist.length)
        setSongIndex(randomIndex)
        let songId = selectedPlaylist[randomIndex]
        dispatch(selectSongChange(songs[songId]))
        return
      }
      if (loop) {
        player.current.currentTime = 0
        return
      }
      let nextIdx = -1
      if (songIndex == (selectedPlaylist?.length - 1)) {
        nextIdx = 0
      } else {
        nextIdx = songIndex + 1
      }
      setSongIndex(nextIdx)
      let songId = selectedPlaylist[nextIdx]
      dispatch(selectSongChange(songs[songId]))
    }

  }, [songSpotTime])

  useEffect(() => {
    if (songUrl.length > 0) {
      player.current.play()
      setPlaying(true)
    }
  }, [songUrl])



  const handlePlayPause = (e) => {
    e.preventDefault()
    if (songUrl.length < 1) return
    if (playing) {
      player.current.pause()
    } else {
      player.current.play()
    }
    setPlaying(!playing)
    return
  }
  const handleShuffleClick = (e) => {
    e.preventDefault()
    setShuffle(!shuffle)
    if (loop) {
      setLoop(false)
    }
  }
  const handleLoopClick = (e) => {
    e.preventDefault()
    setLoop(!loop)
    if (shuffle) {
      setShuffle(false)
    }
    return
  }
  const handleBackClick = (e) => {
    e.preventDefault()
    if (songSpotTime > 5) {
      player.current.currentTime = 0
      return
    } else {
      let nextIdx = -1
      if (songIndex == 0) {
        nextIdx = selectedPlaylist.length - 1
      } else {
        nextIdx = songIndex - 1
      }
      let songId = selectedPlaylist[nextIdx]
      dispatch(selectSongChange(songs[songId]))
      return
    }

  }
  const handleForwardClick = (e) => {
    e.preventDefault()
    let nextIdx = -1
    if (shuffle) {
      let randomIndex = Math.floor(Math.random() * selectedPlaylist.length)
      setSongIndex(randomIndex)
      let songId = selectedPlaylist[randomIndex]
      dispatch(selectSongChange(songs[songId]))
      return
    }
    
    if (songIndex == (selectedPlaylist.length - 1)) {
      nextIdx = 0
    } else {
      nextIdx = songIndex + 1
    }
    setSongIndex(nextIdx)
    let songId = selectedPlaylist[nextIdx]
    dispatch(selectSongChange(songs[songId]))
    return

  }

  const handleSeekerChange = (e) => {
    e.preventDefault()
    setSeekerBar(e.target.value)
    player.current.currentTime = e.target.value
  }
  const handleVolumeSeekerChange = (e) => {
    e.preventDefault()
    setVolume(e.target.value)
    player.current.volume = e.target.value / 100
  }
  const secondConverter = (rawSeconds) => {

    const minutes = Math.floor(rawSeconds / 60)
    const seconds = rawSeconds % 60
    let secondsFormated = seconds
    if (seconds < 10) {
      secondsFormated = `0${seconds}`
    }
    const timeFormated = `${minutes}:${secondsFormated}`
    return timeFormated
  }
  const timeUpdate = () => {
    const length = Math.floor(player.current.duration)
    const currentTime = Math.floor(player.current.currentTime)
    player.current.volume = volume / 100
    setSeekerBar(currentTime)
    setSongLength(length)
    setSongSpotTime(parseInt(currentTime))
  }

  return (
    <div className="audio-player">
      <div className="player-song-detail-wrapper">
        {songUrl?.length > 0 && (
          <div className="player-song-detail">
            <img className="player-song-image" src={selected?.song?.coverPicture} />
            <div className="player-song-details">
              <div className="player-song-name">
                {selected?.song?.songName}
              </div>
              <div className="player-song-author">
                {selected?.song?.authorInfo?.username}
              </div>
            </div>
          </div>
        )}
      </div>
      <audio
        ref={player}
        src={songUrl}
        preload="metadata"
        onTimeUpdate={timeUpdate}
      ></audio>
      <div className="player-main-player">
        <div className="player-buttons">
          {shuffle ? (
            <button onClick={(e) => handleShuffleClick(e)} className="player-pressed-button">
              <i className="fa-solid fa-shuffle fa-lg" style={{ color: "#7cd4fc" }} />
            </button>

          ) : (
            <button onClick={(e) => handleShuffleClick(e)} className="other-player-buttons">
              <i className="fa-solid fa-shuffle fa-lg" />
            </button>
          )}
          <button className="other-player-buttons" onClick={(e) => handleBackClick(e)}> <i className="fa-solid fa-backward fa-lg" /></button>
          <button className="player-play-pause-button" onClick={(e) => handlePlayPause(e)}> {playing ? (<i className="fa-solid fa-pause fa-xl" />) : (<i className="fa-solid fa-play fa-xl" />)} </button>
          <button className="other-player-buttons" onClick={(e) => handleForwardClick(e)} ><i className="fa-solid fa-forward fa-lg" /></button>
          {loop ? (
            <button onClick={(e) => handleLoopClick(e)} className="player-pressed-button"> <i className="fa-solid fa-repeat fa-lg" style={{ color: "#7cd4fc" }} /> </button>
          ) : (
            <button onClick={(e) => handleLoopClick(e)} className="other-player-buttons"> <i className="fa-solid fa-repeat fa-lg" /> </button>
          )}
        </div>
        <div className="player-details">
          <div>
            {secondConverter(songSpotTime)}
          </div>
          <div>
            <input
              className="seek-bar"
              type="range"
              onChange={handleSeekerChange}
              // defaultValue={0}
              max={isNaN(songLength) ? 0 : songLength}
              value={seekerBar}
            />
          </div>
          <div>
            {isNaN(songLength) ? '0:00' : secondConverter(songLength)}
          </div>
        </div>

      </div>
      <div className="player-volume-controls">
        <div>
          {volume == 0 ? (
            <i className="fa-solid fa-volume-xmark fa-lg" style={{ color: "#ffffff" }} />
          ) : (
            <i className="fa-solid fa-volume-high fa-lg" style={{ color: "#ffffff" }} />
          )}

        </div>
        <input
          className="volume-seek-bar"
          type="range"
          onChange={handleVolumeSeekerChange}
          // defaultValue={0}
          max={100}
          value={volume}
        />
      </div>

    </div >
  )

}
export default Player
