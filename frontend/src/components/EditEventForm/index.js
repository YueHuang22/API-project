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

        return history.push(`/events/${eventId}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Venue ID:
                <input
                    type="text"
                    value={venueId}
                    onChange={(e) => setVenueId(e.target.value)}
                />
            </label>
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
                Type:
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Online" >Online</option>
                    <option value="In Person">In Person</option>
                </select>
            </label>
            <label>
                Capacity:
                <input
                    type="text"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                />
            </label>
            <label>
                Price:
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Start Date:
                <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartdate(e.target.value)}
                    required
                />
            </label>
            <label>
                End Date:
                <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEnddate(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default EditEventForm;