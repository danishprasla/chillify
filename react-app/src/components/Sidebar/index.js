import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';
import OpenModalButton from '../OpenModalButton';
import PostPlaylistModal from '../PostPlaylistModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PostSongModal from '../PostSongModal';

function Sidebar() {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const handleHomeClick = () => {
		history.push('/')
	}
	const handleMyMusicClick = () => {
		history.push('/my-music')
	}


	return (
		<div className='side-bar-container'>
			<div className='first-side-bar-section'>
				<div className='side-bar-home' onClick={handleHomeClick}>
					<div>
						<i className="fa-solid fa-house fa-lg" />
					</div>
					<h3>
						Home
					</h3>
				</div>
				<div>
					<OpenModalButton
						className='side-bar-upload-song-button'
						buttonText="Upload Music"
						modalComponent={<PostSongModal />}
					/>
				</div>
			</div>
			<div className='second-side-bar-section'>
				<div className='side-bar-library-title'>
					<div>
						<i className="fa-solid fa-book-open fa-lg" />
					</div>
					<h3>
						Your Library
					</h3>
				</div>
				<div className='side-bar-music-title' onClick={handleMyMusicClick}>
					<div>
						<i className="fa-solid fa-music fa-lg" />
					</div>
					<h3>
						Your Music
					</h3>
				</div>
			</div>
			<div className='footer-side-bar-section'>

			</div>
		</div>
	);
}

export default Sidebar;