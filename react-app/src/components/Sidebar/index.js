import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';
import OpenModalButton from '../OpenModalButton';
import PostPlaylistModal from '../PostPlaylistModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PostSongModal from '../PostSongModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

function Sidebar() {
	const history = useHistory()
	const handleHomeClick = () => {
		history.push('/')
	}
	const handleMyMusicClick = () => {
		history.push('/my-music')
	}
	const user = useSelector((state) => state.session.user)
	const playlists = useSelector((state) => state.playlists)



	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	if (!user) {
		return (
			<h1> Loading ... </h1>
		)
	}
	const dropDown = "library-button" + (showMenu ? "" : " hidden");
	const closeMenu = () => setShowMenu(false);

	const playlistArr = Object.values(playlists)
	const userPlaylists = playlistArr.filter(playlist => playlist.user == user.id)

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
				<div className='second-container'>
					<div className='second-side-bar-title'>
						<div className='side-bar-library-title'>
							<i className="fa-solid fa-book-open fa-lg" />
							<h3>
								Your Library
							</h3>
						</div>
						<div onClick={openMenu} className='side-bar-plus'>
							<i className="fa-solid fa-plus fa-lg" />
						</div>
					</div>
					<div className='drop-down-wrapper'>

						<div className={dropDown} ref={ulRef}>
							<div className='side-bar-upload-song-div'>
								<i className="fa-regular fa-file-audio fa-lg" />
								<OpenModalMenuItem
									className='side-bar-upload-song-button'
									onItemClick={closeMenu}
									itemText="Upload Music"
									modalComponent={<PostSongModal />}
								/>
							</div>
							<div className='side-bar-upload-playlist-div'>
								<i className="fa-solid fa-headphones-simple fa-lg" />
								<OpenModalMenuItem
									className='side-bar-upload-playlist-button'
									onItemClick={closeMenu}
									itemText="Create Playlist"
									modalComponent={<PostPlaylistModal />}
								/>
							</div>

						</div>
					</div>
				</div>
				<div className='side-bar-music-title' onClick={handleMyMusicClick}>
					<div>
						<i className="fa-solid fa-music fa-lg" />
					</div>
					<h3>
						Your Music
					</h3>
				</div>
				<div className='side-bar-playlist-wrapper'>
					{(!user.playlistIds.length) ? (
						<div>
							No playlists. Click the plus sign above to create one now!
						</div>

					) : (
						<div className="side-bar-playlist-container">
							{userPlaylists.map((playlist) => (
								<div className='side-bar-playlist-tile' key={`side-bar-${playlist.id}`} onClick={() => history.push(`/playlists/${playlist.id}`)}>
									<img className='side-bar-playlist-image' src={playlist.coverImage} />
									<div>
										<div className="side-bar-playlist-title"> {playlist.name}
										</div>
										<div className='side-bar-playlist-owner'>
											{playlist.playlistOwner}
										</div>

									</div>
								</div>
							))}
						</div>

					)}


				</div>
			</div>
			<div className='footer-side-bar-section'>
				<div className='me-container'>
					<h3>Made by Danish Prasla</h3>
					<div className="footer-name-block">
						<a href="https://www.linkedin.com/in/danish-prasla-819a7199/" target="_blank">
							<img className="linkedin-logo" src="https://cdn.discordapp.com/attachments/1113213089702228038/1115021661377400832/linkedinLogo.png" />
						</a>
						<a href="https://github.com/danishprasla" target="_blank">
							<img className="github-logo" src="https://cdn.discordapp.com/attachments/1116044689452322926/1116106706192187422/github-icon-256x249-eb1fu3cu.png" />
						</a>
					</div>

				</div>

			</div>
		</div>
	);
}

export default Sidebar;