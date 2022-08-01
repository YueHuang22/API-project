import { GrLocation } from 'react-icons/gr'
import { BsPersonCircle, BsPeople, BsPerson } from 'react-icons/bs'
import { useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneGroup, deleteOneGroup } from '../../store/groups';
import { getEventsForGroup } from '../../store/events';
import { getMembersForGroup } from '../../store/members';
import "./GroupDetail.css"

const GroupDetail = () => {
    const dispatch = useDispatch();
    let history = useHistory()
    const { groupId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

    let group = useSelector(state => {
        return state.group && state.group.length === 1 && state.group[0]
    })

    let events = useSelector(state => state.event)
    let members = useSelector(state => state.member)

    useEffect(() => {
        dispatch(getOneGroup(groupId));
        dispatch(getEventsForGroup(groupId))
        dispatch(getMembersForGroup(groupId))
    }, [dispatch, groupId]);

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneGroup(groupId)).then(
            () => history.push('/groups')
        );
    };

    return (
        (group && (
            <div style={{ borderTop: "1px solid rgba(46,62,72,.12)" }}>
                <div>
                    <div className='container' style={{ display: "flex" }}>
                        <img className='group-picture' alt='group' src={group.previewImage}></img>
                        <div className="group-header">
                            <h1 className='group-name'>
                                {group.name}
                            </h1>
                            <div>
                                <GrLocation /> <span>{group.city}, {group.state}</span>
                            </div>
                            <div>
                                <BsPeople /><span> {group.numMembers} members · {group.private === true ? 'Private' : 'Public'} group</span>
                            </div>
                            <div>
                                <BsPerson /><span> Organized by <span style={{ fontWeight: "bold" }}>{group.organizer.firstName} {group.organizer.lastName[0].toUpperCase()}.</span></span>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "60px" }}></div>
                    <div className='group-body'>
                        <div className='container'>
                            <div className='group-details'>
                                <div className='group-details-header'>What we're about</div>
                                <div>{group.about}</div>
                            </div>
                            <div className='group-members'>
                                <div className='group-members-container'>
                                    <div className='group-details-header'>Organizer</div>
                                    <div className='member'>
                                        <div><BsPersonCircle /></div>
                                        <div>{group.organizer.firstName} {group.organizer.lastName}</div>
                                    </div>
                                </div>
                                <div className='group-members-container'>
                                    <div className='group-details-header'>Members ({group.numMembers})</div>
                                    {members && members.map((member) =>
                                        <div className='member'>
                                            <div><BsPersonCircle /></div>
                                            <div>{member.firstName} {member.lastName}</div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>

                    </div>

                    <button className='group-detail-button'><NavLink exact to={`/groups`} style={{ textDecoration: 'none', color: "white" }}>Back to List</NavLink></button>
                    <br></br>

                    {sessionUser && group.organizerId === sessionUser.id && <button className='group-detail-button'><NavLink exact to={`/groups/${groupId}/edit`} style={{ textDecoration: 'none', color: "white" }}>Edit</NavLink></button>}
                    <br></br>

                    {sessionUser && group.organizerId === sessionUser.id && <button className='group-detail-button' onClick={handleClick}>Delete</button>}
                </div>

                {
                    sessionUser && group.organizerId === sessionUser.id && <button className='group-detail-button'>
                        <span>
                            <NavLink exact to={`/groups/${group.id}/events/new`} style={{ textDecoration: 'none', color: "white" }}>Start an Event</NavLink>
                        </span>
                    </button>
                }
            </div >
        ))
    );
};

export default GroupDetail;
