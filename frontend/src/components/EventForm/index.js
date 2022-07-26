import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/events";
import './EventForm.css';


function EventForm() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [type, setType] = useState("Online");
    const [isPrivate, setPrivate] = useState(false);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        // return dispatch(groupActions.creatOneGroup({ name, about, type, private: isPrivate, city, state }))
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) {
        //             if (Array.isArray(data.errors)) {
        //                 setErrors(data.errors)
        //             } else {
        //                 setErrors(Object.values(data.errors))
        //             }
        //         }
        //         else if (data && data.message) (setErrors([data.message]))
        //     });

    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                About:
                <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    required
                />
            </label>
            {/* <label>
                Confirm Password
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                First Name
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </label>
            <label>
                Last Name
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Sign Up</button> */}
        </form>
    );
}

export default EventForm