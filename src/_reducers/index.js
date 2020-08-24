import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import indsReducer from "./inds-reducer";
import paramsReducer from "./params-reducer";
import archiveReducer from "./archive-reducer";
import dynamicsReducer from "./dynamics-reducer";
import levelsReducer from "./levels-reducer";
import budgetLevelsReducer from "./budget-levels-reducer";
import reportsReducer from "../Analyst/Reports/ReportsReducers";

export default combineReducers({
  errors: errorReducer,
  indsPage: indsReducer,
  paramsPage: paramsReducer,
  archivePage: archiveReducer,
  dynamicsPage: dynamicsReducer,
  levelsPage: levelsReducer,
  budgetLevelsPage: budgetLevelsReducer,
  reports: reportsReducer,
});
