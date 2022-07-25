import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllGroups } from "../../store/groups";
import './GroupPage.css'

function GroupPage() {
    const dispatch = useDispatch()
    // const groups = useSelector(state => {
    //     return state.group.map(groupId => state.group[groupId]);
    // });

    const groups = useSelector(state => state.group);

    useEffect(() => {
        dispatch(getAllGroups());
    }, [dispatch]);

    if (!groups) {
        return null;
    }

    return (
        <div>
            <ul>
                {groups.map((group) => {
                    return (
                        // <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
                        <li>
                            <div>{group.name}</div>
                            <div>{group.city}</div>
                            <div>{group.state}</div>
                            <div>{group.about}</div>
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

export default GroupPage;