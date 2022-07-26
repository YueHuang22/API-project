import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/Homepage";
import GroupPage from "./components/GroupPage";
import GroupDetail from "./components/GroupDetail";
import NewGroupForm from "./components/NewGroupForm";
import EditGroupForm from "./components/EditGroupForm";
import EventPage from "./components/EventPage";
import EventDetail from "./components/EventDetail";
import NewEventForm from "./components/NewEventForm";
import EditEventForm from "./components/EditEventForm";
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
            <NewGroupForm />
          </Route>
          <Route exact path="/groups/:groupId">
            <GroupDetail />
          </Route>
          <Route exact path="/groups/:groupId/edit">
            <EditGroupForm />
          </Route>
          <Route exact path="/groups/:groupId/events/new">
            <NewEventForm />
          </Route>
          <Route exact path="/events">
            <EventPage />
          </Route>
          <Route exact path="/events/:eventId">
            <EventDetail />
          </Route>
          <Route exact path="/events/:eventId/edit">
            <EditEventForm />
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