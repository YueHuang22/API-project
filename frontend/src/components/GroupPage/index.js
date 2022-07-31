import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllGroups } from "../../store/groups";
import './GroupPage.css'

function GroupPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const groups = useSelector(state => state.group);
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllGroups());
    }, [dispatch]);

    return (
        <div className="group-page">
            <div style={{ height: 80 }}>
                <NavLink className="group-link" exact to="/events" >Events</NavLink>
                <NavLink className="group-link" exact to="/groups" >Groups</NavLink>
                {sessionUser &&
                    <NavLink className="group-link" exact to="/groups/new" style={{ float: "right", color: "#008294" }}>Start a group</NavLink>
                }
            </div>
            <div>
                {groups.map((group) => {
                    return (
                        <>
                            <div className="card" onClick={() => history.push(`/groups/${group.id}`)}>
                                <div className="cardimg">
                                    <img alt="" src={group.previewImage}></img>
                                </div>

                                <div className="card-content">

                                    <div className="title" key={group.name} to={`/groups/${group.id}`}>{group.name}
                                    </div>

                                    <div className="address" >
                                        {group.city}, {group.state}
                                    </div>
                                    <div className="card-text">{group.about}</div>
                                    <div className="card-text">
                                        {group.numMembers} members · {group.private === true ? 'Private' : 'Public'}
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </div >
    )
}

export default GroupPage;