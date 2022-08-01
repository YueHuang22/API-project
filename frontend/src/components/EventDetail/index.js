
import { GoLocation } from 'react-icons/go'
import { AiOutlineVideoCamera, AiOutlineClockCircle } from "react-icons/ai"
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneEvent, deleteOneEvent } from '../../store/events';
import "./EventDetail.css"
import { getOneGroup } from '../../store/groups';

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

    useEffect(() => {
        dispatch(getOneGroup(event.groupId));
    }, [dispatch, event])


    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneEvent(eventId)).then(
            () => history.push('/events')
        );
    };

    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)
    return (
        (event && (
            <div style={{ borderTop: "1px solid rgba(46,62,72,.12)", backgroundColor: "rgb(246 247 248)" }}>
                <div className='container'>
                    <div className='event-date'>{startDate.toLocaleDateString("en-us", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>
                    <h1 className='event-name'>{event.name}</h1>
                    <div className='event-body'>
                        <div>
                            <img alt="" src={event.previewImage}></img>
                            <h2>Details</h2>
                            <div>{event.description}</div>
                            <h2>Attendees ({event.numAttending})</h2>
                        </div>
                        <div>
                            <div>
                                <div>{event.Group.name}</div>
                                <div>{event.Group.private === true ? 'Private' : 'Public'} group</div>
                            </div>
                            <div>
                                <div>
                                    <AiOutlineClockCircle />
                                    <div>
                                        {startDate.toLocaleDateString("en-us", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} at {(startDate.getHours() > 12 ? startDate.getHours() - 12 : startDate.getHours())}:{startDate.getMinutes().toString().padStart(2, "0")} {startDate.getHours() > 12 ? "PM" : "AM"} to<br />
                                        {endDate.toLocaleDateString("en-us", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} at {(endDate.getHours() > 12 ? endDate.getHours() - 12 : startDate.getHours())}:{endDate.getMinutes().toString().padStart(2, "0")} {endDate.getHours() > 12 ? "PM" : "AM"}
                                    </div>
                                </div>
                                <div>
                                    {event.type === "online" ? (<AiOutlineVideoCamera />) : (<GoLocation />)}
                                    <div>{event.type === "online" ? 'Online event' : `${event.Group.city}, ${event.Group.state}`}</div>
                                </div>

                            </div>
                            <div className='blue-button-div'>
                                <div>
                                    <button className='group-detail-button' onClick={() => history.push("/events")}>Back to List</button>
                                </div>
                                <div className='blue-button-right'>
                                    <button className='group-detail-button' onClick={() => history.push(`/groups/${event.groupId}`)}>Back to this Group</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='event-detail-button-div'>
                        <div>
                            {sessionUser && group.organizerId === sessionUser.id &&
                                <button className='group-detail-button-red' onClick={() => history.push(`/events/${eventId}/edit`)}>
                                    Edit
                                </button>}
                        </div>
                        <div className='blue-button-right'>
                            {sessionUser && group.organizerId === sessionUser.id && <button className='group-detail-button-red' onClick={handleClick}>Delete</button>}
                        </div>
                    </div>
                </div>
            </div>
        ))
    );
};


export default EventDetail;