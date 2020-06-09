import { ArchiveAPI } from "@/_services/api-archive.service";


const SET_PARAMETER_VALS = "SET_PARAMETER_VALS";
const SET_INDICATOR_VALS = "SET_INDICATOR_VALS";
const SET_ACTIVITY_VALS = "SET_ACTIVITY_VALS";
const SET_PROJECT_VALS = "SET_PROJECT_VALS";

const TOOGLE_IS_FETCHING_PARAMETER_DATA = "TOOGLE_IS_FETCHING_PARAMETER_DATA";
const TOOGLE_IS_FETCHING_INDICATOR_DATA = "TOOGLE_IS_FETCHING_INDICATOR_DATA";
const TOOGLE_IS_FETCHING_ACTIVITY_DATA = "TOOGLE_IS_FETCHING_ACTIVITY_DATA";
const TOOGLE_IS_FETCHING_PROJECT_DATA = "TOOGLE_IS_FETCHING_PROJECT_DATA";

let initialState = {

  parameterVals: [],
  isFetchingParameterData: false,
  isLoadIndicators: false,
  isLoadActivity: false,
  isLoadProject: false,
};

const archiveReducer = (state = initialState, action) => {
  //debugger;
  switch (action.type) {

    case TOOGLE_IS_FETCHING_PARAMETER_DATA:
      return {
        ...state,
        isFetchingParameterData: action.isFetchingParameterData,
      };
    case TOOGLE_IS_FETCHING_INDICATOR_DATA:
      return {
        ...state,
        isLoadIndicators: action.isLoadIndicators,
      };
    case TOOGLE_IS_FETCHING_ACTIVITY_DATA:
      return {
        ...state,
        isLoadActivity: action.isLoadActivity,
      };
    case TOOGLE_IS_FETCHING_PROJECT_DATA:
      return {
        ...state,
        isLoadProject: action.isLoadProject,
      };
    case SET_PARAMETER_VALS:
      return {
        ...state,
        parameterVals: action.parameterVals,
      };
    case SET_INDICATOR_VALS:
      return {
        ...state,
        indicatorVals: action.indicatorVals,
      };
    case SET_ACTIVITY_VALS:
      return {
        ...state,
        activityVals: action.activityVals,
      };
    case SET_PROJECT_VALS:
      return {
        ...state,
        projectVals: action.projectVals,
      };
    default:
      return state;
  }
};

// Action creators
export const setParameterValues = (parameterVals) => ({ type: SET_PARAMETER_VALS, parameterVals });
export const setIndicatorValues = (indicatorVals) => ({ type: SET_INDICATOR_VALS, indicatorVals });
export const setActivityValues = (vals) => ({ type: SET_ACTIVITY_VALS, vals });
export const setProjectValues = (vals) => ({ type: SET_PROJECT_VALS, vals });

export const toogleIsFetchingParameterData = (isFetchingParameterData) => ({
  type: TOOGLE_IS_FETCHING_PARAMETER_DATA,
  isFetchingParameterData,
});

export const toogleIndicator = (isLoadIndicators) => ({
  type: TOOGLE_IS_FETCHING_INDICATOR_DATA,
  isLoadIndicators,
});

export const toogleActivity = (isLoadActivity) => ({
  type: TOOGLE_IS_FETCHING_ACTIVITY_DATA,
  isLoadActivity,
});

export const toogleProject = (isLoadProject) => ({
  type: TOOGLE_IS_FETCHING_PROJECT_DATA,
  isLoadProject,
});

// Redux ThunkCreators
export const getParameterValues = (transportTypeId, dataProviderId, okudId, parameterId, year, quarterId) => {
  return (dispatch) => {

    dispatch(toogleIsFetchingParameterData(true));

    ArchiveAPI.getParameterData(transportTypeId, dataProviderId, okudId, parameterId, year, quarterId).then((data) => {

      dispatch(setParameterValues(data));
      dispatch(toogleIsFetchingParameterData(false));
    });

  };
};

export const getIndicatorValues = (transportTypeId, scenarioId, okudId, indicatorId, year, quarterId, startDate, endDate) => {
  return (dispatch) => {

    dispatch(toogleIndicator(true));
    ArchiveAPI.getIndicatorData(transportTypeId, scenarioId, okudId, indicatorId, year, quarterId, startDate, endDate).then((data) => {
    	
      dispatch(setIndicatorValues(data));
      dispatch(toogleIndicator(false));
    });
  };
};

export const getActivityValues = (transportTypeId, scenarioId, okudId, indicatorId, year, quarterId, startDate, endDate) => {
  return (dispatch) => {

    dispatch(toogleActivity(true));
    ArchiveAPI.getIndicatorData(transportTypeId, scenarioId, okudId, indicatorId, year, quarterId, startDate, endDate).then((data) => {
    	
      dispatch(setActivityValues(data));
      dispatch(toogleActivity(false));
    });
  };
};

export const getProjectValues = (transportTypeId, scenarioId, okudId, indicatorId, year, quarterId, startDate, endDate) => {
  return (dispatch) => {

    dispatch(toogleProject(true));
    ArchiveAPI.getProjectData(transportTypeId, scenarioId, okudId, indicatorId, year, quarterId, startDate, endDate).then((data) => {
    	
      dispatch(setProjectValues(data));
      dispatch(toogleProject(false));
    });
  };
};

export default archiveReducer;