import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getGenreThunk } from "../../store/genre";
import { selectSong } from "../../store/selectedSong";


function GenrePage() {
  const { genreId } = useParams();
  const dispatch = useDispatch()

  const genres = useSelector((state) => state.genres)
  const songs = useSelector((state) => state.songs)

  const [hoverPlay, setHoverPlay] = useState(null)

  // useEffect(()=> {
  //   dispatch(getGenreThunk())
  // }, [dispatch])

  // console.log('---->',genres)
  if (Object.values(genres).length == 0 || Object.values(songs).length == 0) {
    return (
      <h1>Loading...</h1>
    )
  }
  const selectedGenre = genres[genreId]
  console.log('selected genre ', selectedGenre)
  const genreMusicIds = selectedGenre.songIds

  return (
    <div>
      {(selectedGenre && !selectedGenre.songIds.length) ? (
        <h2>
          This genre has no music
        </h2>

      ) : (
        <div>

          <div className='playlist-page-playlist-detail'>
            <img className='playlist-page-cover-img' src={selectedGenre.genreCover} />
            <div>
              <div>Genre</div>
              <h1>Explore {selectedGenre?.name}</h1>
            </div>

          </div>
          <div className='songs-container-labels'>
            <div></div>
          </div>
          <div className='songs-container'>
            {genreMusicIds.map((songId, idx) => (
              <div
                key={`genre-${songId}`}
                className='song-tile'
                onMouseEnter={() => setHoverPlay(idx)}
                onMouseLeave={() => setHoverPlay(null)}
              >
                {hoverPlay === idx ? (
              <div
                className='song-play-button'
                onClick={() => dispatch(selectSong(songs[songId], genreMusicIds))}
              >
                <i className="fa-solid fa-play" style={{ color: "#7cd4fc" }} />
              </div>) :
              (<div>
                {idx + 1}
              </div>)
            }
                <div>
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
                  <div>
                  </div>
                </div>
              </div>
            ))}


          </div>
        </div>



      )}
    </div>
  )
}

export default GenrePage