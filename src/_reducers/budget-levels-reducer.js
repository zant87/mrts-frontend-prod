import { BudgetLevelsAPI } from "@/_services/api-budget-levels.service";

const SET_INDS = "SET_INDS";

const TOOGLE_IS_FETCHING_INDS = "TOOGLE_IS_FETCHING_INDS";
const TOOGLE_IS_FETCHING_BUDLEV_DATA = "TOOGLE_IS_FETCHING_BUDLEV_DATA";
const SET_BUDLEV_VALS = "SET_BUDLEV_VALS";
const SET_GOALS = "SET_GOALS";
const SET_TRANSPORT_TYPES = "SET_TRANSPORT_TYPES";
const SET_TRANSPORT_TYPE_ID = "SET_TRANSPORT_TYPE_ID";
const SET_GOAL_ID = "SET_GOAL_ID";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_YEARS = "SET_YEARS";
const SET_SCENARIOS = "SET_SCENARIOS";
const SET_SCENARIO_ID = "SET_SCENARIO_ID";
const SET_CHECKED_IND_ID = "SET_CHECKED_IND_ID";
const SET_FUNDINGS = "SET_FUNDINGS";
const SET_FUNDING_ID = "SET_FUNDING_ID";
const SET_BUDLEV_YEAR_START = "SET_BUDLEV_YEAR_START";
const SET_BUDLEV_YEAR_END = "SET_BUDLEV_YEAR_END";

let initialState = {
  inds: [],
  budLevVals: null,
  goals: null,
  transportTypes: null,
  isFetchingInds: false,
  isFetchingBudLevData: false,
  checkedIndId: "1039",
  goalId: 34,
  transportTypeId: "0",
  years: null,
  yearStart: 2016,
  yearEnd: 2020,
  scenarios: null,
  scenarioId: null,
  fundings: null,
  fundingId: 3,
};

const budgetLevelsReducer = (state = initialState, action) => {
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
    case TOOGLE_IS_FETCHING_BUDLEV_DATA:
      return {
        ...state,
        isFetchingBudLevData: action.isFetchingBudLevData,
      };

    case SET_BUDLEV_VALS:
      return {
        ...state,
        budLevVals: action.budLevVals,
      };
    case SET_CHECKED_IND_ID:
      return {
        ...state,
        checkedIndId: action.checkedIndId,
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
    case SET_TRANSPORT_TYPE_ID:
      return {
        ...state,
        transportTypeId: action.transportTypeId,
      };
    case SET_BUDLEV_YEAR_START:
      return {
        ...state,
        yearStart: action.yearStart,
      };
    case SET_BUDLEV_YEAR_END:
      return {
        ...state,
        yearEnd: action.yearEnd,
      };
    case SET_YEARS:
      return {
        ...state,
        years: action.years,
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
    case SET_FUNDINGS:
      return {
        ...state,
        fundings: action.fundings,
      };
    case SET_FUNDING_ID:
      return {
        ...state,
        fundingId: action.fundingId,
      };
    default:
      return state;
  }
};

//ActionCreators
export const setInds = (inds) => ({ type: SET_INDS, inds });
export const setCheckedIndId = (checkedIndId) => ({
  type: SET_CHECKED_IND_ID,
  checkedIndId,
});
export const toogleIsFetchingInds = (isFetchingInds) => ({
  type: TOOGLE_IS_FETCHING_INDS,
  isFetchingInds,
});
export const toogleIsFetchingBudLevData = (isFetchingBudLevData) => ({
  type: TOOGLE_IS_FETCHING_BUDLEV_DATA,
  isFetchingBudLevData,
});

export const setBudLevValues = (budLevVals) => ({ type: SET_BUDLEV_VALS, budLevVals });
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

export const setFundings = (fundings) => ({
  type: SET_FUNDINGS,
  fundings,
});

export const setFundingId = (fundingId) => ({
  type: SET_FUNDING_ID,
  fundingId,
});

export const setYearStart = (yearStart) => ({
  type: SET_BUDLEV_YEAR_START,
  yearStart,
});

export const setYearEnd = (yearEnd) => ({
  type: SET_BUDLEV_YEAR_END,
  yearEnd,
});

export const setYears = (years) => ({
  type: SET_YEARS,
  years,
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
    BudgetLevelsAPI.getInds().then((data) => {
      dispatch(setInds(data));
      dispatch(toogleIsFetchingInds(false));
    });
  };
};

export const getBudLevValues = (selectedInd, fundingId, scenarioId, yearStart, yearEnd) => {
  return (dispatch) => {
    dispatch(toogleIsFetchingBudLevData(true));
    dispatch(setCheckedIndId(selectedInd));
    //debugger;
    BudgetLevelsAPI.getBudgetLevelsData(selectedInd, fundingId, scenarioId, yearStart, yearEnd).then((data) => {
      dispatch(setBudLevValues(data));
      dispatch(toogleIsFetchingBudLevData(false));
    });
    dispatch(setFundingId(fundingId));
    dispatch(setYearStart(yearStart));
    dispatch(setYearEnd(yearEnd));
    //debugger;
  };
};

export const getGoals = () => {
  return (dispatch) => {
    BudgetLevelsAPI.getGoals().then((data) => {
      dispatch(setGoals(data));
    });
  };
};

export const getTransportTypes = () => {
  return (dispatch) => {
    BudgetLevelsAPI.getTransportTypes().then((data) => {
      dispatch(setTransportTypes(data));
    });
  };
};

export const getYears = () => {
  return (dispatch) => {
    BudgetLevelsAPI.getYears().then((data) => {
      dispatch(setYears(data));
    });
  };
};

export const getFundings = () => {
  return (dispatch) => {
    BudgetLevelsAPI.getFundings().then((data) => {
      dispatch(setFundings(data));
    });
  };
};

export const getScenarios = () => {
  return (dispatch) => {
    BudgetLevelsAPI.getScenarios().then((data) => {
      dispatch(setScenarios(data));
    });
  };
};

export default budgetLevelsReducer;
