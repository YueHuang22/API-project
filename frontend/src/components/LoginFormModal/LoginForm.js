import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function LoginForm() {
    const dispatch = useDispatch();
    let history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(sessionActions.login({ email, password }))
            .then(() => history.push(`/groups`))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                    else if (data && data.message) (setErrors([data.message]))
                }
            );
    };

    return (
        <div className="login-form-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="signup-form-title">Logging in</div>
                <div className="signup-errors">
                    <ul>
                        {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
                    </ul>
                </div>

                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Email
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
                        <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div>
                    <button className="signup-submitbutton" type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;