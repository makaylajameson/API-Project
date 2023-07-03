import { csrfFetch } from "./csrf";

// Action Types
const GET_SPOTS = "spots/GET_SPOTS";

// Action Creators
const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    };
};

// Thunk Action Creator
export const thunkGetSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const spots = await response.json();
        dispatch(getSpots(spots.Spots));
        return response;
    }
};

// export const fetchSingleSpot = (spotId) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${spotId}`)
//     if (response.ok) {
//         const spot = await response.json()
//         dispatch(getSpotById(spot))
//         return spot
//     }
// }

// Initial State
const initialState = {
    allSpots: {},
    singleSpot: {},
};

// Reducer
const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case GET_SPOTS:
        newState = { ...state, allSpots: {}, singleSpot: {} };
        action.payload.forEach(spot => newState.allSpots[spot.id] = spot)
        return newState;

      default:
        return state;
    }
  }
export default spotsReducer;
