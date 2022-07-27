import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as groupActions from "../../store/groups";
import './NewGroupForm.css';

function NewGroupForm() {
    const dispatch = useDispatch();
    let history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    // const group = useSelector((state) => state.group);
    // const id = group[0].id

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
        const group = await dispatch(groupActions.creatOneGroup({ name, about, type, private: isPrivate, city, state }))
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

        return history.push(`/groups/${group.id}`);
    };

    return (
        <>
            {(!sessionUser) && <h1>Please log in to create a group</h1>}
            {sessionUser && (<form onSubmit={handleSubmit}>

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
                <label>
                    Type:
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Online" >Online</option>
                        <option value="In Person">In Person</option>
                    </select>
                </label>
                <label>
                    Private:
                    <select value={isPrivate} onChange={(e) => setPrivate(e.target.value)}>
                        <option value={true}>Private</option>
                        <option value={false}>Public</option>
                    </select>
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State:
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            )}
        </>
    );
}

export default NewGroupForm;