import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as eventActions from "../../store/events";
import './NewEventForm.css';

function NewEventForm() {
    const dispatch = useDispatch();
    let history = useHistory()
    const { groupId } = useParams()
    const sessionUser = useSelector((state) => state.session.user);

    const [venueId, setVenueId] = useState(null);
    const [name, setName] = useState("");
    const [type, setType] = useState("Online");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartdate] = useState("");
    const [endDate, setEnddate] = useState("");

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(eventActions.creatOneEvent(groupId, {
            venueId, name, type, capacity, price, description, startDate, endDate,
        }))
            .then((event) => history.push(`/events/${event.id}`))
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
            {(!sessionUser) && <h1>Please log in to create an event.</h1>}

            {sessionUser && <form className="event-form" onSubmit={handleSubmit}>
                <div className="signup-form-title">Creating a new event</div>
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

export default NewEventForm