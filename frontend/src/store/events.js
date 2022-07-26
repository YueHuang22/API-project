import { csrfFetch } from './csrf';

const LOAD_EVENTS = 'event/LOAD-EVENTS'
const LOAD_ONE_EVENT = 'event/LOAD_ONE_EVENT'
const ADD_EVENT = "event/ADD_EVENT";
const EDIT_EVENT = "event/EDIT_EVENT";
const DELETE_EVENT = "event/DELETE_EVENT";

export const loadEvents = (events) => {
    return {
        type: LOAD_EVENTS,
        payload: events,
    };
};

export const loadOneEvent = (event) => {
    return {
        type: LOAD_ONE_EVENT,
        payload: event
    };
};

export const addEvent = (event) => {
    return {
        type: ADD_EVENT,
        payload: event,
    };
};

export const editEvent = (id, event) => {
    return {
        type: EDIT_EVENT,
        payload: { id, event },
    };
};

export const deleteEvent = (id) => {
    return {
        type: DELETE_EVENT,
        payload: id,
    };
};


export const getAllEvents = () => async (dispatch) => {
    const response = await fetch('/api/events');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadEvents(data.Events));
    }
};

export const getOneEvent = (id) => async (dispatch) => {
    const response = await fetch(`/api/events/${id}`);
    if (response.ok) {
        const event = await response.json();
        dispatch(loadOneEvent(event));
    }
}

export const creatOneEvent = (groupId, payload) => async (dispatch) => {
    const { venueId, name, type, capacity,
        price, description, startDate, endDate, } = payload;
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        body: JSON.stringify({
            venueId, name, type, capacity, price, description, startDate, endDate,
        }),
    });
    if (response.ok) {
        const event = await response.json();
        dispatch(addEvent(event));
    }
};

export const editOneEvent = (id, payload) => async (dispatch) => {
    const { venueId, name, type, capacity,
        price, description, startDate, endDate, } = payload;
    const response = await csrfFetch(`/api/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            venueId, name, type, capacity,
            price, description, startDate, endDate,
        }),
    });
    if (response.ok) {
        const group = await response.json();
        dispatch(editEvent(id, group));
    }
};

export const deleteOneEvent = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteEvent(id));
    }
};

const initialState = [];

const eventReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_EVENTS:
            newState = [...action.payload]
            return newState;
        case LOAD_ONE_EVENT:
            newState = [action.payload]
            return newState;
        case ADD_EVENT:
            newState = [...state, action.payload]
            return newState;
        case EDIT_EVENT:
            const event = state.find(event => event.id === +action.payload.id)
            newState = [...state]
            newState = newState.filter(f => f !== event)
            newState = [...newState, action.payload.event]
            return newState;
        case DELETE_EVENT:
            const eventtodelete = state.find(event => event.id === +action.payload)
            newState = [...state];
            newState = newState.filter(f => f !== eventtodelete)
            return newState;
        default:
            return state;
    }
};

export default eventReducer;