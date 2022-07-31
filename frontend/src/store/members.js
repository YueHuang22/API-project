
const LOAD_MEMBERS = 'member/LOAD-MEMBERS'

export const loadMembers = (members) => {
    return {
        type: LOAD_MEMBERS,
        payload: members,
    };
};

export const getMembersForGroup = (id) => async (dispatch) => {
    const response = await fetch(`/api/groups/${id}/members`)
    if (response.ok) {
        const data = await response.json();
        dispatch(loadMembers(data.Members));
    }
}

const initialState = [];

const memberReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_MEMBERS:
            newState = [...action.payload]
            return newState;
        default:
            return state;
    }
};

export default memberReducer;