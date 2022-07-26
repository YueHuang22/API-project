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
            <ul>
                {events.map((event) => {
                    return (
                        <NavLink key={event.name} to={`/events/${event.id}`}>
                            <li>
                                <div>{event.name}</div>
                                <div>{event.type}</div>
                                <div>{event.capacity}</div>
                                <div>{event.description}</div>
                            </li>
                            <br></br>
                        </NavLink>
                    );
                })}
            </ul>
        </div>
    )
}

export default EventPage;