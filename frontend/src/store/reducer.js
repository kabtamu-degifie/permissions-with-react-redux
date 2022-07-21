import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../services/Register/user.slice";

export default combineReducers({
  user: userReducer,
});
