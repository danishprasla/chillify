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


	return (
		<div className='side-bar'>
			This is the sidebar
			<div className='first-side-bar-section'>
				<div className='side-bar-home' onClick={handleHomeClick}>
					<div>
						<i className="fa-solid fa-house fa-xl" style={{ color: "#ffffff", }} />

					</div>
					<h2>
						Home
					</h2>
				</div>
				<div>
					<OpenModalButton
						className='side-bar-upload-song-button'
						buttonText="Upload Music"
						modalComponent={<PostSongModal />}

					/>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;