import { csrfFetch } from "./csrf";

// Action Types
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_SPOT = 'spots/GET_SPOT';

// Action Creators
const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  payload: spots
})

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    payload: spot
  }
}

// Thunk Action Creator
export const thunkGetSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  if (response.ok) {
    const spots = await response.json();
    dispatch(getAllSpots(spots.Spots));
    return response;
  }
};

export const fetchSingleSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if (response.ok) {
    const spot = await response.json()
    dispatch(getSpot(spot))
    return response
  } else {
    const errors = await response.json();
    return errors
  }
}

// Initial State
const initialState = {
  allSpots: {},
  singleSpot: {},
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { ...state, allSpots: {}, singleSpot: {} };
      action.payload.forEach(spot => newState.allSpots[spot.id] = spot)
      return newState;
    case GET_SPOT:
      newState = { ...state, allSpots: {}, singleSpot: {} };
      newState.singleSpot = action.payload
      return newState;


    default:
      return state;
  }
}
export default spotsReducer;
