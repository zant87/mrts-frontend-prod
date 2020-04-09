import { ParamsAPI } from "@/_services/api-params.service";

const SET_PARAMS = "SET_PARAMS";
const TOOGLE_IS_FETCHING_PARAMS = "TOOGLE_IS_FETCHING_PARAMS";
const TOOGLE_IS_FETCHING_PARAM_DATA = "TOOGLE_IS_FETCHING_PARAM_DATA";
const TOOGLE_IS_FETCHING_PARAM_INFO = "TOOGLE_IS_FETCHING_PARAM_INFO";
const SET_PARAM_VALS = "SET_PARAM_VALS";
const SET_TRANSPORT_TYPES = "SET_TRANSPORT_TYPES";
const SET_TRANSPORT_TYPE_ID = "SET_TRANSPORT_TYPE_ID";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_FREQUENCIES = "SET_FREQUENCIES";
const SET_FREQUENCY_ID = "SET_FREQUENCY_ID";
const SET_PARAM_ID = "SET_PARAM_ID";

let initialState = {
  params: [],
  paramVals: null,
  transportTypes: null,
  isFetchingParams: false,
  isFetchingParamData: false,
  isFetchingParamInfo: false,
  paramId: null,
  searchQuery: null,
  transportTypeId: "0",
  frequencies: null,
  frequencyId: 1,
};

const paramsReducer = (state = initialState, action) => {
  //debugger;
  switch (action.type) {
    case SET_PARAMS:
      return {
        ...state,
        params: action.params,
      };
    case TOOGLE_IS_FETCHING_PARAMS:
      return {
        ...state,
        isFetchingParams: action.isFetchingParams,
      };
    case TOOGLE_IS_FETCHING_PARAM_DATA:
      return {
        ...state,
        isFetchingParamData: action.isFetchingParamData,
      };
    case TOOGLE_IS_FETCHING_PARAM_INFO:
      return {
        ...state,
        isFetchingParamInfo: action.isFetchingParamInfo,
      };
    case SET_PARAM_VALS:
      return {
        ...state,
        paramVals: action.paramVals,
      };
    case SET_PARAM_ID:
      return {
        ...state,
        paramId: action.paramId,
      };
    case SET_TRANSPORT_TYPES:
      return {
        ...state,
        transportTypes: action.transportTypes,
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    case SET_TRANSPORT_TYPE_ID:
      return {
        ...state,
        transportTypeId: action.transportTypeId,
      };
    case SET_FREQUENCIES:
      return {
        ...state,
        frequencies: action.frequencies,
      };
    case SET_FREQUENCY_ID:
      return {
        ...state,
        frequencyId: action.frequencyId,
      };
    default:
      return state;
  }
};

//ActionCreators
export const setParams = (params) => ({ type: SET_PARAMS, params });
export const setParamId = (paramId) => ({ type: SET_PARAM_ID, paramId });
export const toogleIsFetchingParams = (isFetchingParams) => ({
  type: TOOGLE_IS_FETCHING_PARAMS,
  isFetchingParams,
});
export const toogleIsFetchingParamData = (isFetchingParamData) => ({
  type: TOOGLE_IS_FETCHING_PARAM_DATA,
  isFetchingParamData,
});
export const toogleIsFetchingParamInfo = (isFetchingParamInfo) => ({
  type: TOOGLE_IS_FETCHING_PARAM_INFO,
  isFetchingParamInfo,
});
export const setParamValues = (paramVals) => ({ type: SET_PARAM_VALS, paramVals });
export const setSearchQuery = (searchQuery) => ({
  type: SET_SEARCH_QUERY,
  searchQuery,
});
export const setTransportTypes = (transportTypes) => ({
  type: SET_TRANSPORT_TYPES,
  transportTypes,
});
export const setTransportTypeId = (transportTypeId) => ({
  type: SET_TRANSPORT_TYPE_ID,
  transportTypeId,
});

export const setFrequencies = (frequencies) => ({
  type: SET_FREQUENCIES,
  frequencies,
});

export const setFrequencyId = (frequencyId) => ({
  type: SET_FREQUENCY_ID,
  frequencyId,
});

//Redux ThunkCreators
export const getParams = () => {
  return (dispatch) => {
    dispatch(toogleIsFetchingParams(true));
    ParamsAPI.getParams().then((data) => {
      dispatch(setParams(data));
      dispatch(toogleIsFetchingParams(false));
    });
  };
};

export const getParamValues = (paramId, frequencyId) => {
  return (dispatch) => {
    dispatch(toogleIsFetchingParamData(true));
    dispatch(setParamId(paramId));
    ParamsAPI.getParamData(paramId, frequencyId).then((data) => {
      dispatch(setParamValues(data));
      dispatch(toogleIsFetchingParamData(false));
    });
    dispatch(setFrequencyId(frequencyId));
  };
};

export const getTransportTypes = () => {
  return (dispatch) => {
    ParamsAPI.getTransportTypes().then((data) => {
      dispatch(setTransportTypes(data));
    });
  };
};

export const getFrequencies = () => {
  return (dispatch) => {
    ParamsAPI.getfrequencies().then((data) => {
      dispatch(setFrequencies(data));
    });
  };
};

export default paramsReducer;
