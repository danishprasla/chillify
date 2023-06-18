import React, { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';
import './Player.css'


function Player() {

  const [playing, setPlaying] = useState(false)
  const [songLength, setSongLength] = useState(0)
  const [songSpotTime, setSongSpotTime] = useState(0)

  //I can sset up a store that will have the song id of the selected song which I can use to key into the song store and get the relevant info
  // I will also need to set up another store(?) which will include a list of id's for the songs belonging to that playlist/genre from which the above song was selected 

  const player = useRef()




  const handlePlayPause = (e) => {
    e.preventDefault()
    if (playing) {
      player.current.pause()
    } else {
      player.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <div className="audio-player">
      <div>
        Track details
      </div>
      <audio ref={player} src="https://chillify-capstone.s3.us-east-2.amazonaws.com/anime-lo-fi/for+lu+ten+(Leaves+from+the+vine+but+it's+lofi+hip+hop).mp3" preload="metadata"></audio>
      <div>
        <div className="player-buttons">
          <button> <i className="fa-solid fa-shuffle" /> </button>
          <button> <i className="fa-solid fa-backward" /></button>
          <button onClick={(e) => handlePlayPause(e)}> {playing ? (<i className="fa-solid fa-pause" />) : (<i className="fa-solid fa-play" />)} </button>
          <button><i className="fa-solid fa-forward" /></button>
          <button> <i className="fa-solid fa-repeat" /> </button>
        </div>
        <div className="player-details">
          <div>Current track time</div>
          <div>
            <input className="seek-bar" type="range" />
          </div>
          <div>{songLength}</div>
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