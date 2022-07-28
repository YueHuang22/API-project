import { useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneEvent, deleteOneEvent } from '../../store/events';

const EventDetail = () => {
    const dispatch = useDispatch();
    let history = useHistory()
    const { eventId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

    let event = useSelector(state => {
        return state.event && state.event.length === 1 && state.event[0]
    })

    let group = useSelector(state => {
        return state.group && state.group.length === 1 && state.group[0]
    })

    useEffect(() => {
        dispatch(getOneEvent(eventId));
    }, [dispatch, eventId]);


    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneEvent(eventId)).then(
            () => history.push('/events')
        );
    };

    return (
        (event && (
            <div>
                <h1>{event.name}</h1>
                <div>{event.Group.name}</div>
                <div>{event.Group.private === true ? 'Private' : 'Public'}</div>
                <div>{event.startDate}</div>
                <div>{event.endDate}</div>
                <div>{event.type === "online" ? 'online' : 'In Person'}</div>
                <div>{event.description}</div>

                <button><NavLink exact to={`/events`}>Back to List</NavLink></button>
                <br></br>

                <button><NavLink exact to={`/groups/${event.groupId}`} >Back to this Group</NavLink></button>
                <br></br>

                {sessionUser && group.organizerId === sessionUser.id && <button><NavLink exact to={`/events/${eventId}/edit`}>Edit</NavLink></button>}
                <br></br>

                {sessionUser && group.organizerId === sessionUser.id && <button onClick={handleClick}>Delete</button>}
            </div>
        ))
    );
};


export default EventDetail;