// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage"
import SingleSpotDetail from "./components/Spots/SingleSpotDetail";
import  ManageSpots from "./components/Spots/ManageSpots";
import CreateSpot from "./components/Spots/CreateSpot"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path='/spots/new'>
            <CreateSpot />
          </Route>
          <Route path='/spots/current'>
            <ManageSpots />
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpotDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
