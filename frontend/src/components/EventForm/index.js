import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/events";
import './EventForm.css';


function EventForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [venueId, setVenueId] = useState(null);
    const [name, setName] = useState("");
    const [type, setType] = useState("Online");
    const [capacity, setCapacity] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [startDate, setStartdate] = useState(null);
    const [endDate, setEnddate] = useState(null);

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(eventActions.creatOneEvent({
            venueId, name, type, capacity, price, description, startDate, endDate,
        }))
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
                <select onChange={(e) => setType(e.target.value)}>
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

export default EventForm