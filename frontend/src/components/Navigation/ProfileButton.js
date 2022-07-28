import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import '../../index.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = async (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        return history.push(`/`);
    };

    return (
        <>
            <button className="button" onClick={openMenu}>
                <i class="fa-solid fa-user"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.firstName}</li>
                    <li>{user.email}</li>
                    <li>
                        <button className="button" onClick={logout}>
                            Log Out
                        </button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;