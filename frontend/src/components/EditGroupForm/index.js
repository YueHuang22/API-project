import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";
import './EditGroupForm.css';

function EditGroupForm() {
    const dispatch = useDispatch();
    let history = useHistory();
    const { groupId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

    let group = useSelector(state => {
        return state.group && state.group[0]
    })

    useEffect(() => {
        dispatch(groupActions.getOneGroup(groupId));
    }, [dispatch, groupId]);

    const [name, setName] = useState(group.name);
    const [about, setAbout] = useState(group.about);
    const [type, setType] = useState(group.type);
    const [isPrivate, setPrivate] = useState(group.isPrivate);
    const [city, setCity] = useState(group.city);
    const [state, setState] = useState(group.state);

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(groupActions.editOneGroup(groupId, { name, about, type, private: isPrivate, city, state }))
            .then(() => history.push(`/groups/${groupId}`))
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
            {(!sessionUser) && <h1>Please log in to edit a group</h1>}

            {sessionUser && <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-form-title">Editing a new group</div>
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
        </div >
    );
}

export default EditGroupForm;