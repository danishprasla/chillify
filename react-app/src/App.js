import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import LandingPage from "./components/LandingPage";
import Player from "./components/Player"
import HomePage from "./components/HomePage";
import GenrePage from "./components/GenrePage";
import PlaylistPage from "./components/PlaylistPage";
import { getPlaylistsThunk } from "./store/playlist";
import { getSongsThunk } from "./store/songs";
import { getGenreThunk } from "./store/genre";
import MyMusic from "./components/UserMusic";
import LoadingComp from "./components/Loading";
import LikedSongs from "./components/LikedSongs";
import PageNotFound from "./components/PageNotFound";
import { getAlbumsThunk } from "./store/album";
import AlbumPage from "./components/AlbumPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  const playlists = useSelector((state) => state.playlists)
  const albums = useSelector((state) => state.albums)
  const songs = useSelector((state) => state.songs)
  const genres = useSelector((state) => state.genres)
  useEffect(() => {
    dispatch(authenticate())
      .then(() => {
        const promiseArr = [];

        if (Object.values(playlists).length === 0) {
          promiseArr.push(dispatch(getPlaylistsThunk()));
        }

        if (Object.values(songs).length === 0) {
          promiseArr.push(dispatch(getSongsThunk()));
        }

        if (Object.values(genres).length === 0) {
          promiseArr.push(dispatch(getGenreThunk()));
        }
        if (Object.values(albums).length === 0) {
          promiseArr.push(dispatch(getAlbumsThunk()));
        }

        return Promise.all(promiseArr);
      })
      .then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <div>
      {!isLoaded ? (
        <LoadingComp />
      ) :
        sessionUser ? (
          <div className="main-body">
            <div className="body-sidebar">
              <div className="side-bar">
                <Sidebar />
              </div>
              <div className="content-body">
                <Navigation isLoaded={isLoaded} />
                {isLoaded && (
                  <Switch>
                    <Route exact path='/'>
                      <HomePage />
                    </Route>
                    <Route path="/login" >
                      <LoginFormPage />
                    </Route>
                    <Route path="/signup">
                      <SignupFormPage />
                    </Route>
                    <Route exact path='/genre/:genreId'>
                      <GenrePage />
                    </Route>
                    <Route exact path='/playlists/:playlistId'>
                      <PlaylistPage />
                    </Route>
                    <Route exact path='/albums/:albumId'>
                      <AlbumPage />
                    </Route>
                    <Route exact path='/my-music'>
                      <MyMusic />
                    </Route>
                    <Route exact path='/liked-songs'>
                      <LikedSongs />
                    </Route>
                    <Route>
                      <PageNotFound />
                    </Route>
                  </Switch>
                )}
              </div>
            </div>
            <div className="audio-player-wrapper">

              <Player />
            </div>
          </div>

        ) : (
          <LandingPage />
        )
      }

    </div>
  );
}

export default App;
