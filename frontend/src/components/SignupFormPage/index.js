import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            await dispatch(sessionActions.signup({ email, password, firstName, lastName, }))
                .then(() => history.push(`/groups`))
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
        } else {
            setErrors(['Confirm Password field must be the same as the Password field']);
        }
    };

    return (
        <div className="signup-form-page">

            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-form-title">Signing up</div>
                <div className="signup-errors">
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>

                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Email
                        <br></br>
                        <input
                            className="form-input"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Password
                        <br></br>
                        <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Confirm Password
                        <br></br>
                        <input
                            className="form-input"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        First Name
                        <br></br>
                        <input
                            className="form-input"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Last Name
                        <br></br>
                        <input
                            className="form-input"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div>
                    <button className="signup-submitbutton" type="submit">Sign Up</button>
                </div>
            </form >
        </div>
    );
}

export default SignupFormPage;