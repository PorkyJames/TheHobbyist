const LOAD = "bookmark/LOAD";
const CREATE = "bookmark/CREATE";
const UPDATE = "bookmark/UPDATE";
const DELETE = "bookmark/DELETE";

//! Action Creators 
const load = (bookmark) => ({
    type: LOAD,
    payload: bookmark
})

const create = (bookmark) => ({
    type: CREATE,
    payload: bookmark
})

const update = (bookmark) => ({
    type: UPDATE,
    payload: bookmark
})

const remove = (bookmark) => ({
    type: DELETE,
    payload: bookmark
})

export const getBookmark = () => async (dispatch) => {
    const res = await fetch("/api/bookmark")

    if (res.ok) {
        const user_bookmark = await res.json();
        dispatch(load(user_bookmark))
    }

    return res;
}

export const createBookmark = (payload) => async (dispatch) => {
    const requestMethod = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    const res = await fetch(`/api/bookmark`)

    if (res.ok) {
        const newBookmark = await res.json()
        dispatch(create(newBookmark))
        return newBookmark
    }
}

// export const updateBookmark = (bookmarkId, payload) => async (dispatch) => {
//     const requestMethod = {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload)
//     }

//     const res = await fetch(`/api/bookmark/${bookmarkId}`)

//     if (res.ok) {
//         const updatedBookmark = await res.json();
//         dispatch(update(updatedBookmark))
//         return updatedBookmark
//     }
// }

export const deleteBookmark = (bookmarkId) => async (dispatch) => {
    const requestMethod= {
        method: "Delete",
    }

    const res = await fetch(`/api/bookmark/${bookmarkId}`)

    if (res.ok) {
        const deletedBookmark = await res.json();
        dispatch(remove(deletedBookmark))
    }
}

//! Reducer

const initialState = {
    Bookmark: {},
}

