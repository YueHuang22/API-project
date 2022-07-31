import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllEvents } from "../../store/events";
import './EventPage.css'

function EventPage() {
    const dispatch = useDispatch()
    const events = useSelector(state => state.event);
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    return (
        <div className="event-page">
            <div style={{ height: 80 }}>
                <NavLink className="group-link" exact to="/events" >Events</NavLink>
                <NavLink className="group-link" exact to="/groups" >Groups</NavLink>
            </div>

            <div>
                {events.map((event) => {
                    const date = new Date(event.startDate);
                    return (
                        <>
                            <div className="card" onClick={() => history.push(`/events/${event.id}`)}>
                                <div className="cardimg">
                                    <img alt="" src={event.previewImage}></img>
                                </div>
                                <div className="card-content">
                                    <div className="time">{`${date.toLocaleDateString("en-us", { weekday: "long", month: "short", day: "numeric" })} · ${(date.getHours() > 12 ? date.getHours() - 12 : date.getHours())}:${date.getMinutes().toString().padStart(2, "0")} ${date.getHours() > 12 ? "pm" : "am"}`}</div>
                                    <div className="title">{event.name}</div>
                                    <div className="card-text">{event.Group.name} · {event.Group.city}, {event.Group.state}</div>
                                    <div className="card-text">{event.numAttending} attendees</div>
                                    <br></br>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    )
}

export default EventPage;