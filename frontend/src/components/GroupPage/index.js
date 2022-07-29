import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllGroups } from "../../store/groups";
import './GroupPage.css'

function GroupPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const groups = useSelector(state => state.group);

    useEffect(() => {
        dispatch(getAllGroups());
    }, [dispatch]);

    return (
        <div>
            <button>
                <span>
                    <NavLink exact to="/events" style={{ textDecoration: 'none', color: "#008294" }}>Events</NavLink>
                </span>
            </button>

            {sessionUser && <button>
                <span>
                    <NavLink exact to="/groups/new" style={{ textDecoration: 'none', color: "#008294" }}>Start a group</NavLink>
                </span>
            </button>}

            <ul>
                {groups.map((group) => {
                    return (
                        <>
                            <div className="card">
                                <div className="cardimg">
                                    <img className="img" alt="" src={group.previewImage}></img>
                                </div>

                                <div className="cardtext">
                                    <div>
                                        <NavLink key={group.name} to={`/groups/${group.id}`}>{group.name}
                                        </NavLink>
                                    </div>
                                    <br></br>
                                    <div>
                                        <span>
                                            {group.city}
                                        </span>
                                        <span>, </span>
                                        <span>
                                            {group.state}
                                        </span>
                                    </div>
                                    <br></br>
                                    <div>{group.about}</div>
                                    <br></br>
                                    <div>{group.name}</div>
                                    <br></br>
                                    <div>
                                        <span>
                                            {group.numMembers}
                                        </span>
                                        <span> members · </span>
                                        <span>
                                            {group.private === true ? 'Private' : 'Public'}
                                        </span>
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                            <hr></hr>
                        </>
                    );
                })}
            </ul >
        </div >
    )
}

export default GroupPage;