import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as eventActions from "../../store/events";
import './EditEventForm.css';

function EditEventForm() {
    const dispatch = useDispatch();
    let history = useHistory();
    const { eventId } = useParams()

    let event = useSelector(state => {
        return state.event && state.event[0]
    })

    useEffect(() => {
        dispatch(eventActions.getOneEvent(eventId));
    }, [dispatch, eventId]);

    // const sessionUser = useSelector((state) => state.session.user);

    const [name, setName] = useState(event.name);
    const [about, setAbout] = useState(event.about);
    const [type, setType] = useState(event.type);
    const [isPrivate, setPrivate] = useState(event.isPrivate);
    const [city, setCity] = useState(event.city);
    const [state, setState] = useState(event.state);

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(eventActions.editOneEvent(eventId, { name, about, type, private: isPrivate, city, state }))
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) {
        //         if (Array.isArray(data.errors)) {
        //             setErrors(data.errors)
        //         } else {
        //             setErrors(Object.values(data.errors))
        //         }
        //     }
        //     else if (data && data.message) (setErrors([data.message]))
        // });

        return history.push(`/events/${eventId}`);
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
            <label>
                Type:
                <select onChange={(e) => setType(e.target.value)}>
                    <option value="Online" >Online</option>
                    <option value="In Person">In Person</option>
                </select>
            </label>
            <label>
                Private:
                <select onChange={(e) => setPrivate(e.target.value)}>
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
    );
}

export default EditEventForm;