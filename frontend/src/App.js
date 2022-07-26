import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/Homepage";
import GroupPage from "./components/GroupPage";
import GroupDetail from "./components/GroupDetail";
import EventPage from "./components/EventPage";
import EventDetail from "./components/EventDetail";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() =>
      setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/api/groups">
            <GroupPage />
          </Route>
          <Route exact path="/api/groups/:groupId">
            <GroupDetail />
          </Route>
          <Route exact path="/api/events">
            <EventPage />
          </Route>
          <Route exact path="/api/events/:eventId">
            <EventDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;