const LOAD = "hobby/LOAD";
const CREATE = "hobby/CREATE";
const UPDATE = "hobby/UPDATE";
const DELETE = "hobby/DELETE";

//! Action Creators

const load = (hobby) => ({
    type: LOAD,
    payload: hobby
})

const create = (hobby) => ({
    type: CREATE,
    payload: hobby
})

const update = (hobby) => ({
    type: UPDATE,
    payload: hobby
})

const remove = (hobby) => ({
    type: DELETE,
    payload: hobby
})

//! Thunks

export const getHobby = () => async (dispatch) => {
    const res = await fetch ("/api/hobby")

    if (res.ok) {
        const hobby = await res.json();
        dispatch(load(hobby))
    }

    return res;
}

export const createHobby = (payload) => async (dispatch) => {
    const requestMethod = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch(`/api/hobby`)

    if (res.ok) {
        const newHobby = await res.json();
        dispatch(create(newHobby));
        return newHobby
    }
}


export const updateHobby = (hobbyId, payload) => async (dispatch) => {
    const requestMethod = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch(`/api/hobby/${hobbyId}`)

    if (res.ok) {
        const updatedHobby = await res.json();
        dispatch(update(updatedHobby));
        return updatedHobby;
    }
}


export const deleteHobby = (hobbyId) => async (dispatch) => {
    const requestMethod = {
        method: "DELETE",
    }

    const res = await fetch (`/api/hobby/${hobbyId}`)

    if (res.ok) {
        const deletedHobby = await res.json();
        dispatch(remove(deletedHobby));
    }
}

//! Reducer 

const initialState = {
    Hobbies: {},
}

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                hobby: action.payload, // Assuming the payload is a single hobby object
            };
        case CREATE:
            return {
                ...state,
                hobbies: [...state.hobbies, action.payload], // Assuming the payload is a new hobby object
            };
        case UPDATE:
            return {
                ...state,
                hobbies: state.hobbies.map(hobby =>
                    hobby.id === action.payload.id ? action.payload : hobby
                ),
                hobby: action.payload.id === state.hobby?.id ? action.payload : state.hobby,
            };
        case DELETE:
            return {
                ...state,
                hobbies: state.hobbies.filter(hobby => hobby.id !== action.payload.id),
                hobby: state.hobby?.id === action.payload.id ? null : state.hobby,
            };
        default:
            return state;
    }
}

export default hobbyReducer;
