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
const SET_PARAM_FREQUENCY_ID = "SET_PARAM_FREQUENCY_ID";
const SET_PARAM_ID = "SET_PARAM_ID";
const SET_FORMS = "SET_FORMS";
const SET_CHECKED_FORM_ID = "SET_CHECKED_FORM_ID";
const SET_QUARTERS = "SET_QUARTERS";
const SET_PARAM_QUARTER_ID = "SET_PARAM_QUARTER_ID";
const SET_YEARS = "SET_YEARS";
const SET_PARAM_YEAR_START = "SET_PARAM_YEAR_START";
const SET_PARAM_YEAR_END = "SET_PARAM_YEAR_END";

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
  paramFrequencyId: 1,
  forms: null,
  checkedFormId: null,
  quarters: null,
  paramQuarterId: null,
  years: null,
  paramYearStart: "2010",
  paramYearEnd: "2019",
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
    case SET_PARAM_FREQUENCY_ID:
      return {
        ...state,
        paramFrequencyId: action.paramFrequencyId,
      };

    case SET_FORMS:
      return {
        ...state,
        forms: action.forms,
      };
    case SET_CHECKED_FORM_ID:
      return {
        ...state,
        checkedFormId: action.checkedFormId,
      };
    case SET_QUARTERS:
      return {
        ...state,
        quarters: action.quarters,
      };
    case SET_PARAM_QUARTER_ID:
      return {
        ...state,
        paramQuarterId: action.paramQuarterId,
      };
    case SET_YEARS:
      return {
        ...state,
        years: action.years,
      };
    case SET_PARAM_YEAR_START:
      return {
        ...state,
        paramYearStart: action.paramYearStart,
      };
    case SET_PARAM_YEAR_END:
      return {
        ...state,
        paramYearEnd: action.paramYearEnd,
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
export const setParamValues = (paramVals) => ({
  type: SET_PARAM_VALS,
  paramVals,
});
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

export const setParamFrequencyId = (paramFrequencyId) => ({
  type: SET_PARAM_FREQUENCY_ID,
  paramFrequencyId,
});

export const setForms = (forms) => ({
  type: SET_FORMS,
  forms,
});

export const setCheckedFormId = (checkedFormId) => ({
  type: SET_CHECKED_FORM_ID,
  checkedFormId,
});

export const setQuarters = (quarters) => ({
  type: SET_QUARTERS,
  quarters,
});

export const setParamQuarterId = (paramQuarterId) => ({
  type: SET_PARAM_QUARTER_ID,
  paramQuarterId,
});

export const setYears = (years) => ({
  type: SET_YEARS,
  years,
});

export const setParamYearStart = (paramYearStart) => ({
  type: SET_PARAM_YEAR_START,
  paramYearStart,
});

export const setParamYearEnd = (paramYearEnd) => ({
  type: SET_PARAM_YEAR_END,
  paramYearEnd,
});

//Redux ThunkCreators
export const getParams = (checkedFormsId) => {
  return (dispatch) => {
    dispatch(toogleIsFetchingParams(true));
    ParamsAPI.getParams(checkedFormsId).then((data) => {
      dispatch(setParams(data));
      dispatch(toogleIsFetchingParams(false));
    });
    dispatch(setCheckedFormId(checkedFormsId));
  };
};

export const getParamValues = (
  paramId,
  paramFrequencyId,
  yearStart,
  yearEnd,
  quarterId
) => {
  return (dispatch) => {
    dispatch(toogleIsFetchingParamData(true));
    dispatch(setParamId(paramId));
    ParamsAPI.getParamData(
      paramId,
      paramFrequencyId,
      yearStart,
      yearEnd,
      quarterId
    ).then((data) => {
      dispatch(setParamValues(data));
      dispatch(toogleIsFetchingParamData(false));
    });
    dispatch(setParamYearStart(yearStart));
    dispatch(setParamYearEnd(yearEnd));
    dispatch(setParamQuarterId(quarterId));
    // if (quarterId != null) {
    //   dispatch(setParamQuarterId(quarterId));
    // }
    dispatch(setParamFrequencyId(paramFrequencyId));
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

export const getForms = () => {
  return (dispatch) => {
    ParamsAPI.getForms().then((data) => {
      dispatch(setForms(data));
    });
  };
};

export const getYears = () => {
  return (dispatch) => {
    ParamsAPI.getYears().then((data) => {
      dispatch(setYears(data));
    });
  };
};

export const getQuarters = () => {
  return (dispatch) => {
    ParamsAPI.getQuarters().then((data) => {
      dispatch(setQuarters(data));
    });
  };
};

export default paramsReducer;
