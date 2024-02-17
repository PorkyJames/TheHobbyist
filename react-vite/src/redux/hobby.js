//! Load User Hobbies

const LOAD_USER_HOBBIES = "hobbies/LOAD_USER_HOBBIES";

const loadUserHobbies = (hobbies) => ({
    type: LOAD_USER_HOBBIES,
    payload: hobbies
});

export const getUserHobbies = () => async (dispatch) => {
    // Fetches hobbies for the current user
    const response = await fetch("/api/hobbies/current");
    if (response.ok) {
        const hobbies = await response.json();
        dispatch(loadUserHobbies(hobbies));
        return hobbies;
    }
};

//! Load ALL hobbies

const LOAD_ALL_HOBBIES = "hobbies/LOAD_ALL_HOBBIES";

const loadAllHobbies = (hobbies) => ({
    type: LOAD_ALL_HOBBIES,
    payload: hobbies
});

export const getAllHobbies = () => async (dispatch) => {
    // Fetches all hobbies in the system
    const response = await fetch("/api/hobbies");
    if (response.ok) {
        const hobbies = await response.json();
        dispatch(loadAllHobbies(hobbies));
        return hobbies;
    }
};

//! Load Each Hobby Details

const LOAD_EACH_HOBBY = "hobbies/LOAD_EACH_HOBBY";

const loadEachHobby = (hobby) => ({
    type: LOAD_EACH_HOBBY,
    payload: hobby
});

export const getHobbyById = (hobbyId) => async (dispatch) => {
    // Fetches details for a single hobby
    const response = await fetch(`/api/hobbies/${hobbyId}`);
    if (response.ok) {
        const hobby = await response.json();
        dispatch(loadEachHobby(hobby));
        return hobby;
    }
};

//! Create A Hobby

const CREATE = "hobbies/CREATE";

const create = (hobby) => ({
    type: CREATE,
    payload: hobby
})

export const createHobby = (payload) => async (dispatch) => {
    const requestMethod = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch(`/api/hobbies`, requestMethod)

    if (res.ok) {
        const newHobby = await res.json();
        console.log(newHobby)
        dispatch(create(newHobby));
        return newHobby
    }
}

//! Update User Hobby

const UPDATE = "hobbies/UPDATE";

const update = (hobby) => ({
    type: UPDATE,
    payload: hobby
})

export const updateHobby = (hobbyId, payload) => async (dispatch) => {
    const requestMethod = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch(`/api/hobbies/${hobbyId}/edit`, requestMethod)

    if (res.ok) {
        const updatedHobby = await res.json();
        dispatch(update(updatedHobby));
        return updatedHobby;
    }
}

//! Delete User Hobby

const DELETE = "hobbies/DELETE";

const remove = (hobby) => ({
    type: DELETE,
    payload: hobby
})

export const deleteHobby = (hobbyId) => async (dispatch) => {
    const requestMethod = {
        method: "DELETE",
    }

    const res = await fetch (`/api/hobbies/${hobbyId}`, requestMethod)

    if (res.ok) {
        const deletedHobby = await res.json();
        dispatch(remove(deletedHobby));
    }
}

//! Reducer 

const initialState = [];

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_HOBBIES:
            return {
                ...state,
                userHobbies: action.payload
            }
        case LOAD_ALL_HOBBIES:
            return action.payload
        case LOAD_EACH_HOBBY:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case UPDATE: {
            const updatedHobby = action.payload; 
            return {
                ...state,
                [updatedHobby.id]: updatedHobby
            };
        }
        case DELETE: {
            const newState = {...state};
            delete newState[action.payload];
            return newState
        }
        default:
            return state
    }
};

export default hobbyReducer;

