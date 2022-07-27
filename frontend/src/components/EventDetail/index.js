import { useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneEvent, deleteOneEvent } from '../../store/events';

const EventDetail = () => {
    const dispatch = useDispatch();
    let history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);

    const { eventId } = useParams();
    let event = useSelector(state => {
        return state.event && state.event[0]
    })

    useEffect(() => {
        dispatch(getOneEvent(eventId));
    }, [dispatch, eventId]);

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneEvent(eventId));
        return history.push('/events');
    };

    return (
        (event && (
            <div>
                <h1>{event.name}</h1>
                <p>
                    {event.about}
                </p>
                {sessionUser && <button><NavLink exact to={`/events/${eventId}/edit`}>Edit</NavLink></button>}
                {sessionUser && <button onClick={handleClick}>Delete</button>}
            </div>
        ))
    );
};


export default EventDetail;