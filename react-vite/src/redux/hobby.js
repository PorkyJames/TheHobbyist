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

    const res = await fetch(`/api/hobbies/${hobbyId}`, requestMethod)

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

const initialState = {
    hobbies: {
        userHobbies: [], 
        allHobbies: [], 
        details: {}, 
    }
};

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_HOBBIES:
            return {
                ...state,
                hobbies: {
                    ...state.hobbies,
                    userHobbies: action.payload
                }
            };
        case LOAD_ALL_HOBBIES:
            return {
                ...state,
                allHobbies: action.payload,
            };
        case LOAD_EACH_HOBBY:
            return {
                ...state,
                details: { ...state.details, [action.payload.id]: action.payload },
            };
        case CREATE:
            return {
                ...state,
                allHobbies: [...state.allHobbies, action.payload],
                userHobbies: [...state.userHobbies, action.payload], // Assuming the new hobby is added to the current user's hobbies
            };
        case UPDATE:
            return {
                ...state,
                allHobbies: state.allHobbies.map(hobby => hobby.id === action.payload.id ? action.payload : hobby),
                userHobbies: state.userHobbies.map(hobby => hobby.id === action.payload.id ? action.payload : hobby),
                details: { ...state.details, [action.payload.id]: action.payload },
            };
        case DELETE:
            return {
                ...state,
                allHobbies: state.allHobbies.filter(hobby => hobby.id !== action.payload.id),
                userHobbies: state.userHobbies.filter(hobby => hobby.id !== action.payload.id),
                details: Object.keys(state.details).reduce((details, id) => {
                    if (id !== action.payload.id.toString()) {
                        details[id] = state.details[id];
                    }
                    return details;
                }, {}),
            };
        default:
            return state;
    }
};

export default hobbyReducer;
