const LOAD = "profile/LOAD";
const CREATE = "profile/CREATE";
const UPDATE = "profile/UPDATE";
const DELETE = "profile/DELETE";

const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const PROFILE_LOADING = 'profile/PROFILE_LOADING';

//! Action Creators 
const load = (profile) => ({
    type: LOAD,
    payload: profile
})

// const create = (profile) => ({
//     type: CREATE,
//     payload: profile
// })

const update = (profile) => ({
    type: UPDATE,
    payload: profile
})

const remove = (profile) => ({
    type: DELETE,
    payload: profile
})

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    payload: profile,
});

export const profileLoading = (isLoading) => ({
    type: PROFILE_LOADING,
    payload: isLoading,
});

//! Thunks

export const getProfile = () => async (dispatch) => {
    const res = await fetch("/api/profiles")

    if (res.ok) {
        const user_profile = await res.json();
        dispatch(load(user_profile))
        return user_profile;
    }
}

export const createProfile = (payload) => async (dispatch) => {
    const requestMethod = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };

    const res = await fetch(`/api/profiles`, requestMethod);

    if (res.ok) {
        const newProfile = await res.json();
        dispatch(setUserProfile(newProfile)); 
        return newProfile;
    }
};


export const updateProfile = (profileId, payload) => async (dispatch) => {
    const requestMethod = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch(`/api/profiles/${profileId}`, requestMethod)

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

    const res = await fetch(`/api/profiles/${profileId}`, requestMethod)
    
    if (res.ok) {
        const deletedProfile = await res.json();
        dispatch(remove(deletedProfile));
    }

}

export const fetchUserProfile = (userId) => async (dispatch) => {
    dispatch(profileLoading(true));
    try {
        const response = await fetch(`/api/profiles/${userId}`);
        if (response.ok) {
            const profile = await response.json();
            dispatch(setUserProfile(profile));
        } else if (response.status === 404) {
            dispatch(setUserProfile(null));
        } else {
            console.error('Error fetching user profile:', response.statusText);
            dispatch(setUserProfile(null));
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        dispatch(setUserProfile(null));
    } finally {
        dispatch(profileLoading(false));
        dispatch(profileCheckCompleted()); // Mark profile check as completed
    }
};

const PROFILE_CHECK_COMPLETED = 'profiles/PROFILE_CHECK_COMPLETED';

// Action creator for setting checkCompleted flag
export const profileCheckCompleted = () => ({
    type: PROFILE_CHECK_COMPLETED,
});

//! Reducer

const initialState = {
    profile: null,
    isLoading: false,
    checkCompleted: false,
};

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
                profile: action.payload,
            };
        case UPDATE:
            return {
                ...state,
                profile: action.payload || null, 
            };
        case DELETE:
            return {
                ...state,
                profile: null,
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...action.payload,
                },
            };
        case PROFILE_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case PROFILE_CHECK_COMPLETED:
            return {
                ...state,
                checkCompleted: true,
            };
        default:
            return state;
    }
}

export default profileReducer;
