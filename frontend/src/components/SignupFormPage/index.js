import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, password, firstName, lastName, }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        if (Array.isArray(data.errors)) {
                            setErrors(data.errors)
                        } else {
                            setErrors(Object.values(data.errors))
                        }
                    }
                    else if (data && data.message) (setErrors([data.message]))
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="form-page">
            <form className="form" onSubmit={handleSubmit}>
                <div className="boxdiv">
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div>
                    <label className="text">
                        Email
                        <br></br>
                        <input
                            className="input"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="text">
                        Password
                        <br></br>
                        <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="text">
                        Confirm Password
                        <br></br>
                        <input
                            className="input"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="text">
                        First Name
                        <br></br>
                        <input
                            className="input"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="text">
                        Last Name
                        <br></br>
                        <input
                            className="input"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <button className="submitbutton" type="submit">Sign Up</button>
                </div>
            </form >
        </div>
    );
}

export default SignupFormPage;