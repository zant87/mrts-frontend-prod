import { ArchiveAPI } from "@/_services/api-archive.service";


const SET_PARAMETER_VALS = "SET_PARAMETER_VALS";
const TOOGLE_IS_FETCHING_PARAMETER_DATA = "TOOGLE_IS_FETCHING_PARAMETER_DATA";

let initialState = {

  parameterVals: [],
  isFetchingParameterData: false,
};

const archiveReducer = (state = initialState, action) => {
  //debugger;
  switch (action.type) {

    case TOOGLE_IS_FETCHING_PARAMETER_DATA:
      return {
        ...state,
        isFetchingParameterData: action.isFetchingParameterData,
      };
    case SET_PARAMETER_VALS:
      return {
        ...state,
        parameterVals: action.parameterVals,
      };
    default:
      return state;
  }
};

// Action creators
export const setParameterValues = (parameterVals) => ({ type: SET_PARAMETER_VALS, parameterVals });

export const toogleIsFetchingParameterData = (isFetchingParameterData) => ({
  type: TOOGLE_IS_FETCHING_PARAMETER_DATA,
  isFetchingParameterData,
});

// Redux ThunkCreators
export const getParameterValues = (transportTypeId, dataProviderId, okudId, parameterId, year, quarterId) => {
  return (dispatch) => {


    //debugger;
    dispatch(toogleIsFetchingParameterData(true));

    ArchiveAPI.getParameterData(transportTypeId, dataProviderId, okudId, parameterId, year, quarterId).then((data) => {
      //debugger;
      dispatch(setParameterValues(data));
      dispatch(toogleIsFetchingParameterData(false));
    });


    /*dispatch(setFrequencyId(frequencyDynId));
    dispatch(setYear(year));
    if (quarter) {
      dispatch(setQuarterId(quarter));
    }*/
  };
};

export default archiveReducer;