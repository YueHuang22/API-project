import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneEvent, deleteOneEvent } from '../../store/events';

const EventDetail = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    let event = useSelector(state => {
        return state.event && state.event[0]
    })

    useEffect(() => {
        dispatch(getOneEvent(eventId));
    }, [dispatch, eventId]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(deleteOneEvent(eventId));
    };

    return (
        (event && (
            <div>
                <h1>{event.name}</h1>
                <p>
                    {event.about}
                </p>
                <button><NavLink exact to={'/events/new'}>Edit</NavLink></button>
                <button onClick={handleClick}>Delete</button>
            </div>
        ))
    );
};


export default EventDetail;