import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSong } from "../../store/selectedSong";
import './LikedSongs.css'

function LikedSongs() {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.session.user)
  const songs = useSelector((state) => state.songs)

  const [hoverPlay, setHoverPlay] = useState(null)
  // console.log(user)
  const likedSongIds = user.likedSongsIds

  let likedSongIdsReversed = []

  for (let i = likedSongIds.length - 1; i >= 0; i--) {
    likedSongIdsReversed.push(likedSongIds[i])
  }
  // console.log(likedSongIdsReversed)
  return (
    <div>
      <div>
        <div className='playlist-page-playlist-detail'>
          <div className='liked-songs-square-page'>
            <i className="fa-solid fa-heart fa-2xl" style={{ color: "#ffffff" }}></i>
          </div>
          <div className='playlist-detail-tile'>
            <div>Playlist</div>
            <h1 className='playlist-name'>Liked Songs</h1>
            <div>
              {user.username} · {likedSongIds.length} songs
            </div>
          </div>

        </div>
        <div className='songs-container-labels'>
          <div>

          </div>
        </div>
        <div className='songs-container'>
          {likedSongIds.map((songId, idx) => (
            <div
              key={`playlist-${songId}`}
              className='song-tile'
              onMouseEnter={() => setHoverPlay(idx)}
              onMouseLeave={() => setHoverPlay(null)}
            >
              {hoverPlay === idx ? (
                <div
                  className='song-play-button'
                  onClick={() => dispatch(selectSong(songs[songId], likedSongIdsReversed))}
                >
                  <i className="fa-solid fa-play" style={{ color: "#7cd4fc" }} />
                </div>) :
                (<div className='song-list-num'>
                  {likedSongIds.length - idx}
                </div>)
              }
              <div className='song-image-container'>
                <img className='song-image' src={songs[songId].coverPicture} />
              </div>
              <div className='song-description-container'>
                <div className='song-description-name-artist'>
                  <div className='song-description-name'>
                    {songs[songId].songName}
                  </div>
                  <div className='song-description-author'>
                    {songs[songId].authorInfo.username}
                  </div>
                </div>
                <div className='song-like-section'>
                  <div className='liked-song'>
                    {(user.likedSongsIds).includes(songId) ? (<i className="fa-solid fa-heart" style={{ color: "#7cd4fc" }} />) : (<i className="fa-regular fa-heart" />)}
                  </div>
                </div>
              </div>
            </div>
          )

          ).reverse()}


        </div>

      </div>
    </div>
  )

}

export default LikedSongs