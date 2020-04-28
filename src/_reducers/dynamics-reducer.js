import { DynamicsAPI } from "@/_services/api-dynamics.service";

const SET_INDS = "SET_INDS";
const SET_CHECKED_INDS_ID = "SET_CHECKED_INDS_ID";
const TOOGLE_IS_FETCHING_INDS = "TOOGLE_IS_FETCHING_INDS";
const TOOGLE_IS_FETCHING_DYN_DATA = "TOOGLE_IS_FETCHING_DYN_DATA";
const SET_DYN_VALS = "SET_DYN_VALS";
const SET_GOALS = "SET_GOALS";
const SET_TRANSPORT_TYPES = "SET_TRANSPORT_TYPES";
const SET_TRANSPORT_TYPE_ID = "SET_TRANSPORT_TYPE_ID";
const SET_GOAL_ID = "SET_GOAL_ID";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_FREQUENCIES = "SET_FREQUENCIES";
const SET_FREQUENCY_ID = "SET_FREQUENCY_ID";
const SET_YEAR = "SET_YEAR";
const SET_YEARS = "SET_YEARS";
const SET_QUARTER_ID = "SET_QUARTER_ID";
const SET_QUARTERS = "SET_QUARTERS";
const SET_SCENARIOS = "SET_SCENARIOS";
const SET_SCENARIO_ID = "SET_SCENARIO_ID";

let initialState = {
  inds: [],
  dynVals: null,
  goals: null,
  transportTypes: null,
  isFetchingInds: false,
  isFetchingDynData: false,
  checkedindsId: [],
  goalId: 34,
  //searchQuery: null,
  transportTypeId: "0",
  frequencies: null,
  frequencyDynId: 1,
  years: null,
  year: 2016,
  quarters: null,
  quarterId: null,
  scenarios: null,
  scenarioId: null,
};

const dynamicsReducer = (state = initialState, action) => {
  //debugger;
  switch (action.type) {
    case SET_INDS:
      return {
        ...state,
        inds: action.inds,
      };
    case TOOGLE_IS_FETCHING_INDS:
      return {
        ...state,
        isFetchingInds: action.isFetchingInds,
      };
    case TOOGLE_IS_FETCHING_DYN_DATA:
      return {
        ...state,
        isFetchingDynData: action.isFetchingDynData,
      };

    case SET_DYN_VALS:
      return {
        ...state,
        dynVals: action.dynVals,
      };
    case SET_CHECKED_INDS_ID:
      return {
        ...state,
        checkedindsId: action.checkedindsId,
      };
    case SET_GOALS:
      return {
        ...state,
        goals: action.goals,
      };
    case SET_TRANSPORT_TYPES:
      return {
        ...state,
        transportTypes: action.transportTypes,
      };
    case SET_GOAL_ID:
      return {
        ...state,
        goalId: action.goalId,
      };
    // case SET_SEARCH_QUERY:
    //   return {
    //     ...state,
    //     searchQuery: action.searchQuery,
    //   };
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
        frequencyDynId: action.frequencyDynId,
      };
    case SET_YEAR:
      return {
        ...state,
        year: action.year,
      };
    case SET_YEARS:
      return {
        ...state,
        years: action.years,
      };
    case SET_QUARTER_ID:
      return {
        ...state,
        quarterId: action.quarterId,
      };
    case SET_QUARTERS:
      return {
        ...state,
        quarters: action.quarters,
      };

    case SET_SCENARIOS:
      return {
        ...state,
        scenarios: action.scenarios,
      };
    case SET_SCENARIO_ID:
      return {
        ...state,
        scenarioId: action.scenarioId,
      };
    default:
      return state;
  }
};

//ActionCreators
export const setInds = (inds) => ({ type: SET_INDS, inds });
export const setCheckedIndsId = (checkedindsId) => ({ type: SET_CHECKED_INDS_ID, checkedindsId });
export const toogleIsFetchingInds = (isFetchingInds) => ({
  type: TOOGLE_IS_FETCHING_INDS,
  isFetchingInds,
});
export const toogleIsFetchingDynData = (isFetchingDynData) => ({
  type: TOOGLE_IS_FETCHING_DYN_DATA,
  isFetchingDynData,
});

export const setDynValues = (dynVals) => ({ type: SET_DYN_VALS, dynVals });
export const setGoals = (goals) => ({ type: SET_GOALS, goals });
export const setSearchQuery = (searchQuery) => ({
  type: SET_SEARCH_QUERY,
  searchQuery,
});
export const setGoalId = (goalId) => ({ type: SET_GOAL_ID, goalId });
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

export const setFrequencyId = (frequencyDynId) => ({
  type: SET_FREQUENCY_ID,
  frequencyDynId,
});

export const setYear = (year) => ({
  type: SET_YEAR,
  year,
});

export const setYears = (years) => ({
  type: SET_YEARS,
  years,
});

export const setQuarterId = (quarterId) => ({
  type: SET_QUARTER_ID,
  quarterId,
});

export const setQuarters = (quarters) => ({
  type: SET_QUARTERS,
  quarters,
});

export const setScenarios = (scenarios) => ({
  type: SET_SCENARIOS,
  scenarios,
});

export const setScenarioId = (scenarioId) => ({
  type: SET_SCENARIO_ID,
  scenarioId,
});

//Redux ThunkCreators
export const getInds = () => {
  return (dispatch) => {
    dispatch(toogleIsFetchingInds(true));
    DynamicsAPI.getInds().then((data) => {
      dispatch(setInds(data));
      dispatch(toogleIsFetchingInds(false));
    });
  };
};

export const getDynValues = (selectedIndsArr, frequencyDynId, scenarioId, year, quarter) => {
  return (dispatch) => {
    //debugger;
    dispatch(toogleIsFetchingDynData(true));
    dispatch(setCheckedIndsId(selectedIndsArr));
    DynamicsAPI.getDynamicsData(selectedIndsArr, frequencyDynId, scenarioId, year, quarter).then((data) => {
      //debugger;
      dispatch(setDynValues(data));
      dispatch(toogleIsFetchingDynData(false));
    });
    dispatch(setFrequencyId(frequencyDynId));
    dispatch(setYear(year));
    if (quarter) {
      dispatch(setQuarterId(quarter));
    }
  };
};

export const getGoals = () => {
  return (dispatch) => {
    DynamicsAPI.getGoals().then((data) => {
      dispatch(setGoals(data));
    });
  };
};

export const getTransportTypes = () => {
  return (dispatch) => {
    DynamicsAPI.getTransportTypes().then((data) => {
      dispatch(setTransportTypes(data));
    });
  };
};

export const getFrequencies = () => {
  return (dispatch) => {
    DynamicsAPI.getfrequencies().then((data) => {
      dispatch(setFrequencies(data));
    });
  };
};

export const getYears = () => {
  return (dispatch) => {
    DynamicsAPI.getYears().then((data) => {
      dispatch(setYears(data));
    });
  };
};

export const getQuarters = () => {
  return (dispatch) => {
    DynamicsAPI.getQuarters().then((data) => {
      dispatch(setQuarters(data));
    });
  };
};

export const getScenarios = () => {
  return (dispatch) => {
    DynamicsAPI.getScenarios().then((data) => {
      dispatch(setScenarios(data));
    });
  };
};

export default dynamicsReducer;
