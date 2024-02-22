const CREATE = "profile/CREATE";
const DELETE = "profile/DELETE";
const LOAD_PROFILE = 'profile/LOAD_PROFILE';
const SET_PROFILE_LOADING = 'profile/SET_PROFILE_LOADING';
const PROFILE_CHECK_COMPLETED = 'profile/PROFILE_CHECK_COMPLETED';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';

//! Action Creators 

const remove = (profile) => ({
    type: DELETE,
    payload: profile
})

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    payload: profile,
});

const loadProfile = (profile) => ({
    type: LOAD_PROFILE,
    payload: profile
});

const setProfileLoading = (isLoading) => ({
    type: SET_PROFILE_LOADING,
    payload: isLoading,
});

const profileCheckCompleted = () => ({
    type: PROFILE_CHECK_COMPLETED,
});



//! Thunks

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
        body: JSON.stringify(payload),
    };

    try {
        const res = await fetch(`/api/profiles/${profileId}`, requestMethod);
        if (res.ok) {
            const updatedProfile = await res.json();
            dispatch(setUserProfile(updatedProfile));
        } else {
            const error = await res.json();
            console.error('Failed to update profile:', error);
        }
    } catch (error) {
        console.error('Error updating user profile:', error);

    }
};

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
    dispatch(setProfileLoading(true));
    try {
        const response = await fetch(`/api/profiles/${userId}`);
        if (response.ok) {
            const profile = await response.json();
            dispatch(loadProfile(profile));
        } else {
            dispatch(loadProfile(null)); 
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        dispatch(loadProfile(null));
    } finally {
        dispatch(setProfileLoading(false));
        dispatch(profileCheckCompleted());
    }
};

//! Reducer

const initialState = {
    profile: undefined,
    isLoading: false,
    checkCompleted: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE:
            return {
                ...state,
                profile: action.payload,
            };
        case DELETE:
            return {
                ...state,
                profile: null,
            };
        case LOAD_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case SET_PROFILE_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case PROFILE_CHECK_COMPLETED:
            return {
                ...state,
                checkCompleted: true,
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        default:
            return state;
    }
}

export default profileReducer;
