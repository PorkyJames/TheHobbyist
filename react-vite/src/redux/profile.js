const LOAD = "profile/LOAD";
const CREATE = "profile/CREATE";
const UPDATE = "profile/UPDATE";
const DELETE = "profile/DELETE";

//! Action Creators 
const load = (profile) => ({
    type: LOAD,
    payload: profile
})

const create = (profile) => ({
    type: CREATE,
    payload: profile
})

const update = (profile) => ({
    type: UPDATE,
    payload: profile
})

const remove = (profile) => ({
    type: DELETE,
    payload: profile
})

//! Thunks

export const getProfile = () => async (dispatch) => {
    const res = await fetch("/api/profile")

    if (res.ok) {
        const user_profile = await res.json();
        dispatch(load(user_profile))
    }

    return res;
}

export const createProfile = (payload) => async (dispatch) => {

    const requestMethod = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch(`/api/profile`, requestMethod)

    if (res.ok) {
        const newProfile = await res.json();

        dispatch(create(newProfile));
        return newProfile
    }
}


export const updateProfile = (profileId, payload) => async (dispatch) => {
    const requestMethod = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch(`/api/profile/${profileId}`, requestMethod)

    if (res.ok) {
        const updatedProfile = await res.json();

        dispatch(update(updatedProfile));
        return updatedProfile
    }
}

export const deleteProfile = (profileId) => async (dispatch) => {
    const requestMethod= {
        method: "DELETE",
    }

    const res = await fetch(`/api/profile/${profileId}`, requestMethod)
    
    if (res.ok) {
        const deletedProfile = await res.json();
        dispatch(remove(deletedProfile));
    }

}

//! Reducer

const initialState = {
    Profile: {},
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                profile: action.payload,
            };
        case CREATE:
            return {
                ...state,
                profiles: [...state.profiles, action.payload],
            };
        case UPDATE:
            return {
                ...state,
                profiles: state.profiles.map(profile =>
                    profile.id === action.payload.id ? action.payload : profile
                ),
                // If you only want to update the current profile
                profile: action.payload,
            };
        case DELETE:
            return {
                ...state,
                profiles: state.profiles.filter(profile => profile.id !== action.payload.id),
                // If you only want to remove the current profile
                profile: state.profile && state.profile.id === action.payload.id ? null : state.profile,
            };
        default:
            return state;
    }
}

export default profileReducer;
