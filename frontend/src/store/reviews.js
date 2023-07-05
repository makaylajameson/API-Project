import { csrfFetch } from "./csrf";

// Action Types
const GET_SPOT_REVIEWS = 'reviews/spot';
// const ADD_REVIEW = 'reviews/addReview';
const DELETE_REVIEW = 'reviews/deleteReview'

// Action Creators
const getSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload: reviews
    }
}

// const addReview = (review) => {
//     return {
//         type: ADD_REVIEW,
//         payload: review

//     }
// }

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    }
}

// Thunk Action Creator
export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getSpotReviews(reviews.Reviews))
        return response
    } else {
        const errors = await response.json();
        return errors;
    }
}

// export const createReviewThunk = () => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
//     if (response.ok) {
//         const reviews = await response.json();
//         dispatch(getSpotReviews(reviews.Reviews))
//         return response
//     } else {
//         const errors = await response.json();
//         return errors;
//     }
// }

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    const data = await response.json();
    dispatch(deleteReview(reviewId))
    return data;
}


// Initial State
const initialState = {
    spot: {},
    user: {}
};

// Reducer
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            newState = { ...state, spot: {} };
            action.payload.forEach(review => newState.spot[review.id] = review);
            return newState;
        case DELETE_REVIEW:
            newState = { ...state }
            delete newState.spot[action.payload];
            return newState
        default:
            return state;
    }
}

export default reviewReducer
