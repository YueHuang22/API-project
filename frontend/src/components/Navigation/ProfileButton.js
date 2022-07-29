import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';

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
            <button className="usericon" onClick={openMenu}>
                <i class="fa-solid fa-user"></i>
            </button>

            {showMenu && (
                <div className="profile-dropdown">
                    <div className="profile-dropdown-text">
                        {user.firstName}
                    </div>

                    <div className="profile-dropdown-text">
                        {user.email}
                    </div>

                    <div>
                        <button className="logoutbutton" onClick={logout}>
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileButton;