import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import indsReducer from "./inds-reducer";

export default combineReducers({
  errors: errorReducer,
  indsPage: indsReducer
});
