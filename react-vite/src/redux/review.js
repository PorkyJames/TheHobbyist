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
        const res = await fetch('/api/reviews/current');
        if (res.ok) {
            const user_review = await res.json();
            // console.log(user_review, "<<<<user_review")
            dispatch(load(user_review)); 
            return user_review
        }
};

export const createReview = (payload) => async (dispatch) => {
    const requestMethod = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch('/api/reviews', requestMethod)

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

    const res = await fetch(`/api/reviews/${reviewId}`, requestMethod)

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

    const res = await fetch(`/api/reviews/${reviewId}`, requestMethod)

    if (res.ok) {
        const deletedReview = await res.json();
        dispatch(remove(deletedReview))
    }
}

//! Reducer
const initialState = {
    reviews: []
}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newReviews = {};
            action.payload.forEach(review => {
                newReviews[review.id] = review;
            });
            return {
                ...state,
                reviews: newReviews
            }
        case CREATE:
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [action.payload.id]: action.payload,
                },
            };
        case UPDATE:
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [action.payload.id]: {
                        ...state.reviews[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        case DELETE:
            const { [action.payload.id]: deletedReview, ...remainingReviews } = state.reviews;
            return {
                ...state,
                reviews: remainingReviews,
            };
        default:
            return state;
    }
}

export default reviewReducer;
