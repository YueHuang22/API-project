import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as eventActions from "../../store/events";
import './EditEventForm.css';

function EditEventForm() {
    const dispatch = useDispatch();
    let history = useHistory();
    const { eventId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

    let event = useSelector(state => {
        return state.event && state.event[0]
    })

    useEffect(() => {
        dispatch(eventActions.getOneEvent(eventId));
    }, [dispatch, eventId]);

    const [venueId, setVenueId] = useState(event.venueId);
    const [name, setName] = useState(event.name);
    const [type, setType] = useState(event.type);
    const [capacity, setCapacity] = useState(event.capacity);
    const [price, setPrice] = useState(event.price);
    const [description, setDescription] = useState(event.description);
    const [startDate, setStartdate] = useState(event.startDate);
    const [endDate, setEnddate] = useState(event.endDate);

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(eventActions.editOneEvent(eventId, {
            venueId, name, type, capacity, price, description, startDate, endDate,
        }))
            .then(() => history.push(`/events/${eventId}`))
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
            {(!sessionUser) && <h1>Please log in to edit an event</h1>}

            {sessionUser && <form className="event-form" onSubmit={handleSubmit}>
                <div className="signup-form-title">Editing an event</div>
                <div className="signup-errors">
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>

                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Venue ID:
                        <input
                            className="form-input"
                            type="text"
                            value={venueId}
                            onChange={(e) => setVenueId(e.target.value)}
                        />
                    </label>
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
                        Type:
                        <select className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="Online" >Online</option>
                            <option value="In Person">In Person</option>
                        </select>
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Capacity:
                        <input
                            className="form-input"
                            type="text"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Price:
                        <input
                            className="form-input"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Description:
                        <input
                            className="form-input"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        Start Date:
                        <input
                            className="form-input"
                            type="text"
                            value={startDate}
                            onChange={(e) => setStartdate(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="signup-form-page-input-div">
                    <label className="form-label">
                        End Date:
                        <input
                            className="form-input"
                            type="text"
                            value={endDate}
                            onChange={(e) => setEnddate(e.target.value)}
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

export default EditEventForm;