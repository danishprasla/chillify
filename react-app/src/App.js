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


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  const playlists = useSelector((state) => state.playlists)
  const songs = useSelector((state) => state.songs)
  const genres = useSelector((state) => state.genres)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    if (Object.values(playlists).length == 0) {
      // console.log('inside if conditional')
      dispatch(getPlaylistsThunk())
    }
    if (Object.values(songs).length == 0) {
      dispatch(getSongsThunk())
    }
    if (Object.values(genres).length == 0) {
      dispatch(getGenreThunk())
    }

  }, [dispatch]);

  return (
    <div>
      {sessionUser ? (
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
                </Switch>
              )}
            </div>
          </div>
          <Player />
        </div>

      ) : (
        <LandingPage />
      )

      }
    </div>
  );
}

export default App;
