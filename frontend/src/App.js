import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/Homepage";
import GroupPage from "./components/GroupPage";
import GroupDetail from "./components/GroupDetail";
import GroupForm from "./components/GroupForm";
import EventPage from "./components/EventPage";
import EventDetail from "./components/EventDetail";
import EventForm from "./components/EventForm";
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
          <Route exact path="/groups">
            <GroupPage />
          </Route>
          <Route exact path="/groups/new">
            <GroupForm />
          </Route>
          <Route exact path="/groups/:groupId/events/new">
            <EventForm />
          </Route>
          <Route exact path="/groups/:groupId">
            <GroupDetail />
          </Route>
          <Route exact path="/events">
            <EventPage />
          </Route>
          <Route exact path="/events/:eventId">
            <EventDetail />
          </Route>
          <Route>
            404 Page Not Found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;