import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllEvents } from "../../store/events";
import './EventPage.css'

function EventPage() {

    const dispatch = useDispatch()
    // const groups = useSelector(state => {
    //     return state.group.map(groupId => state.group[groupId]);
    // });

    const events = useSelector(state => state.event);

    useEffect(() => {
        dispatch(getAllEvents());
    }, [dispatch]);

    if (!events) {
        return null;
    }

    return (
        <div>
            <ul>
                {events.map((event) => {
                    return (
                        // <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
                        <li>
                            <div>{event.name}</div>
                            <div>{event.city}</div>
                            <div>{event.state}</div>
                            <div>{event.description}</div>
                            {/* <div>{group.nummembers}</div> */}
                            {/* <div>{group.private}</div> */}
                        </li>
                        // </NavLink>
                    );
                })}
            </ul>

        </div>

    )
}

export default EventPage;