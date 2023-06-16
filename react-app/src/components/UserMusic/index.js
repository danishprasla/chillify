import React from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import PostSongModal from "../PostSongModal";

const MyMusic = () => {

  const user = useSelector((state) => state.session.user)
  const songs = useSelector((state) => state.songs)

  if (Object.values(songs).length === 0) {
    return (
      <h1>
        Loading...
      </h1>
    )
  }

  const mySongIds = user.mySongs
  // console.log('SONG IDS FOR MINE!',mySongIds)

  return (
    <div>
      <div>
        <h1>
          Your Music
        </h1>
      </div>
      <div className="songs-container">
        {mySongIds.map((songId, idx) => (
          <div key={`my-songs-${songId}`} className='song-tile'>
            <div>
              {mySongIds.length - idx}
            </div>
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
                <OpenModalButton
                  className='side-bar-upload-song-button'
                  buttonText="Edit Song"
                  modalComponent={<PostSongModal song={songs[songId]} formType={'edit'} />}
                />
                <OpenModalButton 
                buttonText="Delete Song"
                />
              </div>
            </div>
          </div>
        )

        ).reverse()}


      </div>
    </div>
  )

}

export default MyMusic