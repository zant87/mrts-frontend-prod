import { IndsAPI } from "@/_services/api-inds.service";

const SET_INDS = "SET_INDS";
const TOOGLE_IS_FETCHING_INDS = "TOOGLE_IS_FETCHING_INDS";
const TOOGLE_IS_FETCHING_IND_DATA = "TOOGLE_IS_FETCHING_IND_DATA";
const TOOGLE_IS_FETCHING_INFO = "TOOGLE_IS_FETCHING_INFO";
const SET_IND_VALS = "SET_IND_VALS";
const SET_GOALS = "SET_GOALS";
const SET_TRANSPORT_TYPES = "SET_TRANSPORT_TYPES";
const SET_TRANSPORT_TYPE_ID = "SET_TRANSPORT_TYPE_ID";
const SET_GOAL_ID = "SET_GOAL_ID";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_FREQUENCIES = "SET_FREQUENCIES";
const SET_FREQUENCY_ID = "SET_FREQUENCY_ID";
const SET_IND_ID = "SET_IND_ID";

let initialState = {
  inds: [],
  indVals: null,
  goals: null,
  transportTypes: null,
  isFetchingInds: false,
  isFetchingIndData: false,
  isFetchingInfo: false,
  indId: null,
  goalId: 34,
  searchQuery: null,
  transportTypeId: "0",
  frequencies: null,
  frequencyId: 1
};

const indsReducer = (state = initialState, action) => {
  //debugger;
  switch (action.type) {
    case SET_INDS:
      return {
        ...state,
        inds: action.inds
      };
    case TOOGLE_IS_FETCHING_INDS:
      return {
        ...state,
        isFetchingInds: action.isFetchingInds
      };
    case TOOGLE_IS_FETCHING_IND_DATA:
      return {
        ...state,
        isFetchingIndData: action.isFetchingIndData
      };
    case TOOGLE_IS_FETCHING_INFO:
      return {
        ...state,
        isFetchingInfo: action.isFetchingInfo
      };
    case SET_IND_VALS:
      return {
        ...state,
        indVals: action.indVals
      };
    case SET_IND_ID:
      return {
        ...state,
        indId: action.indId
      };
    case SET_GOALS:
      return {
        ...state,
        goals: action.goals
      };
    case SET_TRANSPORT_TYPES:
      return {
        ...state,
        transportTypes: action.transportTypes
      };
    case SET_GOAL_ID:
      return {
        ...state,
        goalId: action.goalId
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery
      };
    case SET_TRANSPORT_TYPE_ID:
      return {
        ...state,
        transportTypeId: action.transportTypeId
      };
    case SET_FREQUENCIES:
      return {
        ...state,
        frequencies: action.frequencies
      };
    case SET_FREQUENCY_ID:
      return {
        ...state,
        frequencyId: action.frequencyId
      };
    default:
      return state;
  }
};

//ActionCreators
export const setInds = inds => ({ type: SET_INDS, inds });
export const setIndId = indId => ({ type: SET_IND_ID, indId });
export const toogleIsFetchingInds = isFetchingInds => ({
  type: TOOGLE_IS_FETCHING_INDS,
  isFetchingInds
});
export const toogleIsFetchingIndData = isFetchingIndData => ({
  type: TOOGLE_IS_FETCHING_IND_DATA,
  isFetchingIndData
});
export const toogleIsFetchingInfo = isFetchingInfo => ({
  type: TOOGLE_IS_FETCHING_INFO,
  isFetchingInfo
});
export const setIndValues = indVals => ({ type: SET_IND_VALS, indVals });
export const setGoals = goals => ({ type: SET_GOALS, goals });
export const setSearchQuery = searchQuery => ({
  type: SET_SEARCH_QUERY,
  searchQuery
});
export const setGoalId = goalId => ({ type: SET_GOAL_ID, goalId });
export const setTransportTypes = transportTypes => ({
  type: SET_TRANSPORT_TYPES,
  transportTypes
});
export const setTransportTypeId = transportTypeId => ({
  type: SET_TRANSPORT_TYPE_ID,
  transportTypeId
});

export const setFrequencies = frequencies => ({
  type: SET_FREQUENCIES,
  frequencies
});

export const setFrequencyId = frequencyId => ({
  type: SET_FREQUENCY_ID,
  frequencyId
});

//Redux ThunkCreators
export const getInds = () => {
  return dispatch => {
    dispatch(toogleIsFetchingInds(true));
    IndsAPI.getInds().then(data => {
      dispatch(setInds(data));
      dispatch(toogleIsFetchingInds(false));
    });
  };
};

export const getIndValues = (indId, frequencyId) => {
  return dispatch => {
    dispatch(toogleIsFetchingIndData(true));
    dispatch(setIndId(indId));
    IndsAPI.getIndData(indId, frequencyId).then(data => {
      dispatch(setIndValues(data));
      dispatch(toogleIsFetchingIndData(false));
    });
    dispatch(setFrequencyId(frequencyId));
  };
};

export const getGoals = () => {
  return dispatch => {
    IndsAPI.getGoals().then(data => {
      dispatch(setGoals(data));
    });
  };
};

export const getTransportTypes = () => {
  return dispatch => {
    IndsAPI.getTransportTypes().then(data => {
      dispatch(setTransportTypes(data));
    });
  };
};

export const getFrequencies = () => {
  return dispatch => {
    IndsAPI.getfrequencies().then(data => {
      dispatch(setFrequencies(data));
    });
  };
};

export default indsReducer;