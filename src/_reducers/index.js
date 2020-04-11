import {combineReducers} from "redux";
import errorReducer from "./errorReducer";
import indsReducer from "./inds-reducer";
import paramsReducer from "./params-reducer";
import reportsReducer from '../Analyst/Reports/ReportsReducers';

export default combineReducers({
  errors: errorReducer,
  indsPage: indsReducer,
  paramsPage: paramsReducer,
  reports: reportsReducer
});
