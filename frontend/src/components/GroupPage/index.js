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
                        <NavLink key={group.name} to={`/groups/${group.id}`}>
                            <div>{group.name}</div>
                            <div>{group.city}</div>
                            <div>{group.state}</div>
                            <div>{group.about}</div>
                            <div>{group.numMembers}</div>
                            <div>{group.private === true ? 'Private' : 'Public'}</div>
                            <br></br>
                        </NavLink>
                    );
                })}
            </ul>
        </div>
    )
}

export default GroupPage;