// const LOAD = "hobbies/LOAD";
const LOAD_USER_HOBBIES = "hobbies/LOAD_USER_HOBBIES";
const LOAD_ALL_HOBBIES = "hobbies/LOAD_ALL_HOBBIES";
const LOAD_EACH_HOBBY = "hobbies/LOAD_EACH_HOBBY";
const CREATE = "hobbies/CREATE";
const UPDATE = "hobbies/UPDATE";
const DELETE = "hobbies/DELETE";

//! Action Creators

// const load = (hobby) => ({
//     type: LOAD,
//     payload: hobby
// })

const loadUserHobbies = (hobbies) => ({
    type: LOAD_USER_HOBBIES,
    payload: hobbies
});

const loadAllHobbies = (hobbies) => ({
    type: LOAD_ALL_HOBBIES,
    payload: hobbies
});

const loadEachHobby = (hobby) => ({
    type: LOAD_EACH_HOBBY,
    payload: hobby
});

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

// export const getHobby = () => async (dispatch) => {
//     const res = await fetch ("/api/hobbies/current")

//     if (res.ok) {
//         const hobby = await res.json();
//         dispatch(load(hobby))
//     }

//     return res;
// }

export const getUserHobbies = () => async (dispatch) => {
    // Fetches hobbies for the current user
    const response = await fetch("/api/hobbies/current");
    if (response.ok) {
        const hobbies = await response.json();
        dispatch(loadUserHobbies(hobbies));
    }
};

export const getAllHobbies = () => async (dispatch) => {
    // Fetches all hobbies in the system
    const response = await fetch("/api/hobbies");
    if (response.ok) {
        const hobbies = await response.json();
        dispatch(loadAllHobbies(hobbies));
    }
};

export const getHobbyById = (hobbyId) => async (dispatch) => {
    // Fetches details for a single hobby
    const response = await fetch(`/api/hobbies/${hobbyId}`);
    if (response.ok) {
        const hobby = await response.json();
        dispatch(loadEachHobby(hobby));
    }
};

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


export const updateHobby = (hobbyId, payload) => async (dispatch) => {
    const requestMethod = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch(`/api/hobbies/${hobbyId}`, requestMethod)

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

    const res = await fetch (`/api/hobbies/${hobbyId}`, requestMethod)

    if (res.ok) {
        const deletedHobby = await res.json();
        dispatch(remove(deletedHobby));
    }
}

//! Reducer 

const initialState = {};

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_HOBBIES: {
            // Assumes action.payload is an array of hobby objects
            const newState = { ...state };
            action.payload.forEach((hobby) => {
                newState[hobby.id] = hobby;
            });
            return newState;
        }
        case LOAD_ALL_HOBBIES: {
            // Assumes action.payload is an array of all hobby objects
            const newState = {};
            action.payload.forEach((hobby) => {
                newState[hobby.id] = hobby;
            });
            return newState;
        }
        case LOAD_EACH_HOBBY: {
            // Assumes action.payload is a single hobby object
            const newState = { ...state };
            const selectedHobby = action.payload;
            newState[selectedHobby.id] = selectedHobby;
            return newState;
        }
        case CREATE: {
            // Assumes action.payload is a new hobby object
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        }
        case UPDATE: {
            // Assumes action.payload is an updated hobby object
            const updatedHobby = action.payload;
            return {
                ...state,
                [updatedHobby.id]: updatedHobby,
            };
        }
        case DELETE: {
            // Assumes action.payload is the ID of the hobby to delete
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        // Additional cases for any other actions
        default:
            return state;
    }
};

export default hobbyReducer;
