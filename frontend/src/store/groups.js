import { csrfFetch } from './csrf';

const LOAD_GROUPS = 'group/LOAD-GROUPS'
const ADD_GROUP = "group/ADD_GROUP";
const EDIT_GROUP = "group/EDIT_GROUP";
const DELETE_GROUP = "group/DELETE_GROUP";

export const loadGroups = (groups) => {
    return {
        type: LOAD_GROUPS,
        payload: groups,
    };
};

export const addGroup = (group) => {
    return {
        type: ADD_GROUP,
        payload: group,
    };
};

export const editGroup = (id, group) => {
    return {
        type: EDIT_GROUP,
        payload: { id, group },
    };
};

export const deleteGroup = (id) => {
    return {
        type: DELETE_GROUP,
        payload: id,
    };
};


export const getAllGroups = () => async (dispatch) => {
    const response = await fetch('/api/groups');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadGroups(data.Groups));
    }
};

// export const getAllGroupsCurrentUser = () => async (dispatch) => {
//     const { email, password } = user;
//     const response = await csrfFetch('/api/groups/my', {
//         method: 'POST',
//         body: JSON.stringify({
//             email,
//             password,
//         }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
// };

// export const getOneGroup = (user) => async (dispatch) => {
//     const { email, password } = user;
//     const response = await csrfFetch('/api/groups/:groupId', {
//         method: 'POST',
//         body: JSON.stringify({
//             email,
//             password,
//         }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
// };

export const creatOneGroup = (payload) => async (dispatch) => {
    const { name, about, type, private: isPrivate, city, state } = payload;
    const response = await csrfFetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify({
            name, about, type, private: isPrivate, city, state
        }),
    });
    if (response.ok) {
        const group = await response.json();
        dispatch(addGroup(group));
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
        dispatch(editGroup(id, group));
    }
};

export const deleteOneGroup = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteGroup(id));
    }
};

const initialState = [];

const groupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_GROUPS:
            newState = [...action.payload]
            return newState;
        case ADD_GROUP:
            newState = [...state, action.payload]
            return newState;
        case EDIT_GROUP:
            const group = state.find(group => group.id === +action.payload.id)
            newState = [...state]
            newState = newState.filter(f => f !== group)
            newState = [...newState, action.payload.group]
            return newState;
        case DELETE_GROUP:
            const grouptodelete = state.find(group => group.id === +action.payload)
            newState = [...state];
            newState = newState.filter(f => f !== grouptodelete)
            return newState;
        default:
            return state;
    }
};

export default groupReducer;