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


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
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
