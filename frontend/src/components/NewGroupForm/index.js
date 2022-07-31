import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as groupActions from "../../store/groups";
import './NewGroupForm.css';

function NewGroupForm() {
    const dispatch = useDispatch();
    let history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [type, setType] = useState("Online");
    const [isPrivate, setPrivate] = useState(false);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(groupActions.creatOneGroup({ name, about, type, private: isPrivate, city, state }))
            .then((group) => history.push(`/groups/${group.id}`))
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
    };

    return (
        <div className="signup-form-page">
            {(!sessionUser) && <h1>Please log in to create a group</h1>}

            {sessionUser && <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-form-title">Creating a new group</div>
                <div className="signup-errors">
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>

                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Name:
                        <input
                            className="form-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        About:
                        <input
                            className="form-input"
                            type="text"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Type:
                        <select className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="Online" >Online</option>
                            <option value="In Person">In Person</option>
                        </select>
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Private:
                        <select className="form-input" value={isPrivate} onChange={(e) => setPrivate(e.target.value)}>
                            <option value={true}>Private</option>
                            <option value={false}>Public</option>
                        </select>
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        City:
                        <input
                            className="form-input"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        State:
                        <input
                            className="form-input"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div>
                    <button className="signup-submitbutton" type="submit">Submit</button>
                </div>
            </form>
            }
        </div>
    );
}

export default NewGroupForm;