import React, { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';
import './Player.css'


function Player() {

  const [playing, setPlaying] = useState(false)
  const [songLength, setSongLength] = useState(0)
  const [songSpotTime, setSongSpotTime] = useState(0)
  const [songUrl, setSongUrl] = useState('')
  const [seekerBar, setSeekerBar] = useState(0)

  //I can sset up a store that will have the song id of the selected song which I can use to key into the song store and get the relevant info
  // I will also need to set up another store(?) which will include a list of id's for the songs belonging to that playlist/genre from which the above song was selected

  const player = useRef()
  useEffect(() => {
    player.current.addEventListener('loadedmetadata', loaded);
    return () => {
      player.current.removeEventListener('loadedmetadata', loaded);
    };
  }, []);

  const loaded = () => {
    setSongLength(Math.floor(player.current.duration));
  };



  const handlePlayPause = (e) => {
    e.preventDefault()
    if (playing) {
      player.current.pause()
    } else {
      player.current.play()
    }
    setPlaying(!playing)
  }
  const handleSeekerChange = (e) => {
    e.preventDefault()
    // console.log(e.target.value)
    setSeekerBar(e.target.value)
    player.current.currentTime = e.target.value
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
    // console.log('test')
    //this fx will be hit whenever audio is playing
    const length = Math.floor(player.current.duration)
    const currentTime = Math.floor(player.current.currentTime)
    //current time includes ms math.floor messing it up
    // const currentTimeString = `${currentTime}`
    // // console.log(currentTimeString)
    // const currentTimeFormated = currentTimeString.split('.')[0]
    // console.log(currentTimeFormated)


    // console.log(totalSecondsCurrent)

    // const currentMinutes = Math.floor(totalSecondsCurrent / 60)
    // const currentSeconds = Math.floor(totalSecondsCurrent % 60)
    // let currentSecondsFormated = currentSeconds
    // if (currentSeconds < 10) {
    //   // console.log('inside current second?!')
    //   currentSecondsFormated = `0${currentSeconds}`
    //   console.log(currentSecondsFormated)
    // }
    // const currentTimeFormated = `${currentMinutes}:${currentSecondsFormated}`
    setSeekerBar(currentTime)
    setSongLength(length)
    setSongSpotTime(parseInt(currentTime))
  }

  return (
    <div className="audio-player">
      <div>
        Track details
      </div>
      <audio
        ref={player}
        src="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/for+lu+ten+(Leaves+from+the+vine+but+it's+lofi+hip+hop).mp3"
        preload="metadata"
        onTimeUpdate={timeUpdate}
      ></audio>
      <div>
        <div className="player-buttons">
          <button> <i className="fa-solid fa-shuffle" /> </button>
          <button> <i className="fa-solid fa-backward" /></button>
          <button onClick={(e) => handlePlayPause(e)}> {playing ? (<i className="fa-solid fa-pause" />) : (<i className="fa-solid fa-play" />)} </button>
          <button><i className="fa-solid fa-forward" /></button>
          <button> <i className="fa-solid fa-repeat" /> </button>
        </div>
        <div className="player-details">
          <div>{secondConverter(songSpotTime)}</div>
          <div>
            {/* {seekerBar} */}
            <input
              className="seek-bar"
              type="range"
              onChange={handleSeekerChange}
              defaultValue={0}
              max={songLength}
              value={seekerBar}
            />
          </div>
          <div>{secondConverter(songLength)}</div>
        </div>

      </div>
      <div>
        Volume controls
      </div>

    </div>
  )

}

{/* <ReactAudioPlayer
  src="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/for+lu+ten+(Leaves+from+the+vine+but+it's+lofi+hip+hop).mp3"
  autoPlay
  controls
  controlsList=""
/> */}
export default Player