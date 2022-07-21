import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../services/Auth/user.slice";

export default combineReducers({
  user: userReducer,
});
