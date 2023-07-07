import { csrfFetch } from "./csrf";

// Action Types
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_SPOT = 'spots/GET_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';

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

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId
  }
}

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
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

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
    });
    dispatch(deleteSpot(spotId));
    return res
  } catch (e) {
    const errors = await e.json()
    return errors
  }
};

export const currentUserSpots = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/spots/current');
    const spots = await res.json()
    dispatch(getAllSpots(spots.Spots))
    return res
  } catch (e) {
    return null
  }
}

export const createSpotThunk = (spot, spotImages, user) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spot)
  })
  if (response.ok) {
    const newSpot = await response.json()
    await dispatch(createSpotImageThunk(newSpot, spotImages, user))
    return newSpot
  } else {
    const errors = await response.json()
    return errors
  }
}

export const createSpotImageThunk = (spot, spotImages) => async () => {

  for (let i = 0; i < spotImages.length; i++) {
    const image = spotImages[i];

    await csrfFetch(`/api/spots/${spot.id}/images`, {
      method: "POST",
      body: JSON.stringify(image)
    })
  }
}

export const updateSpotThunk = (spot, spotId) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(spot)
  })

  if (response.ok) {
    const newSpot = await response.json()
    dispatch(createSpot(spot))
    return newSpot
  } else {
    const errors = await response.json()
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
    case DELETE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} }
      delete newState.allSpots[action.payload];
      return newState
    case CREATE_SPOT:
      newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...action.payload } };
      newState.allSpots[action.payload.id] = action.payload;
      return newState;

    default:
      return state;
  }
}
export default spotsReducer;
