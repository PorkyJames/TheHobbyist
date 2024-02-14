const LOAD = "review/LOAD";
const CREATE = "review/CREATE";
const UPDATE = "review/UPDATE";
const DELETE = "review/DELETE";


//! Action Creators
const load = (review) => ({
    type: LOAD,
    payload: review
})

const create = (review) => ({
    type: CREATE,
    payload: review
})

const update = (review) => ({
    type: UPDATE,
    payload: review
})

const remove = (review) => ({
    type: DELETE,
    payload: review
})


//! Thunks

export const getReview = () => async (dispatch) => {
    const res = await fetch('/api/review')

    if (res.ok) {
        const user_review = await res.json();
        dispatch(load(user_review))
    }

    return res;
}

export const createReview = (payload) => async (dispatch) => {
    const requestMethod = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch('/api/review', requestMethod)

    if (res.ok) {
        const newReview = await res.json();
        dispatch(create(newReview))
        return newReview
    }
}

export const updateReview = (reviewId, payload) => async (dispatch) => {
    const requestMethod = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch(`/api/review/${reviewId}`, requestMethod)

    if (res.ok) {
        const updatedReview = await res.json()
        dispatch(update(updatedReview))
        return updatedReview
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const requestMethod = {
        method: "DELETE",
    }

    const res = await fetch(`/api/review/${reviewId}`, requestMethod)

    if (res.ok) {
        const deletedReview = await res.json();
        dispatch(remove(deletedReview))
    }
}

//! Reducer
const initialState = {
    review: [],
}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                reviews: action.payload,
            };
        case CREATE:
            return {
                ...state,
                reviews: [...state.reviews, action.payload],
            };
        case UPDATE:
            return {
                ...state,
                reviews: state.reviews.map(review =>
                    review.id === action.payload.id ? action.payload : review
                ),
            };
        case DELETE:
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== (action.payload.id || action.payload)),
            };
        default:
            return state;
    }
}

export default reviewReducer;
