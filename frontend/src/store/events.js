import { csrfFetch } from './csrf';

const LOAD_EVENTS = 'event/LOAD-EVENTS'
const ADD_EVENT = "event/ADD_EVENT";
const EDIT_EVENT = "event/EDIT_EVENT";
const DELETE_EVENT = "event/DELETE_EVENT";

export const loadEvents = (events) => {
    return {
        type: LOAD_EVENTS,
        payload: events,
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

export const creatOneGroup = (groupId, payload) => async (dispatch) => {
    const { name, about, type, private: isPrivate, city, state } = payload;
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        body: JSON.stringify({
            name, about, type, private: isPrivate, city, state
        }),
    });
    if (response.ok) {
        const group = await response.json();
        dispatch(addEvent(group));
    }
};

export const editOneGroup = (id, payload) => async (dispatch) => {
    const { name, about, type, private: isPrivate, city, state } = payload;
    const response = await csrfFetch(`/api/groups/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name, about, type, private: isPrivate, city, state
        }),
    });
    if (response.ok) {
        const group = await response.json();
        dispatch(editEvent(id, group));
    }
};

export const deleteOneGroup = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${id}`, {
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
        case ADD_EVENT:
            newState = [...state, action.payload]
            return newState;
        case EDIT_EVENT:
            const group = state.find(group => group.id === +action.payload.id)
            newState = [...state]
            newState = newState.filter(f => f !== group)
            newState = [...newState, action.payload.group]
            return newState;
        case DELETE_EVENT:
            const grouptodelete = state.find(group => group.id === +action.payload)
            newState = [...state];
            newState = newState.filter(f => f !== grouptodelete)
            return newState;
        default:
            return state;
    }
};

export default eventReducer;