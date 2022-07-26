import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllGroups } from "../../store/groups";
import './GroupPage.css'

function GroupPage() {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.group);

    useEffect(() => {
        dispatch(getAllGroups());
    }, [dispatch]);

    return (
        <div>
            <ul>
                {groups.map((group) => {
                    return (
                        <NavLink key={group.name} to={`/groups/${group.id}`}>
                            <li>
                                <div>{group.name}</div>
                                <div>{group.city}</div>
                                <div>{group.state}</div>
                                <div>{group.about}</div>
                                <div>{group.type}</div>
                                {/* <div>{group.nummembers}</div> */}
                                {/* <div>{group.private}</div> */}
                            </li>
                            <br></br>
                        </NavLink>
                    );
                })}
            </ul>
            <button>
                <span>
                    <NavLink exact to="/groups/new">Start a group</NavLink>
                </span>
            </button>
        </div>
    )
}

export default GroupPage;