import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllEvents } from "../../store/events";
import './EventPage.css'

function EventPage() {
    const dispatch = useDispatch()
    const events = useSelector(state => state.event);

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    return (
        <div>
            <button>
                <span>
                    <NavLink exact to="/groups" style={{ textDecoration: 'none', color: "#008294" }}>Groups</NavLink>
                </span>
            </button>

            <ul>
                {events.map((event) => {
                    return (
                        <NavLink key={event.name} to={`/events/${event.id}`}>
                            <div>{event.startDate}</div>
                            <div>{event.name}</div>
                            <div>{event.Group.name}</div>
                            <div>{event.Group.city}</div>
                            <div>{event.Group.state}</div>
                            <div>{event.numAttending}</div>
                            <br></br>
                        </NavLink>
                    );
                })}
            </ul>
        </div>
    )
}

export default EventPage;