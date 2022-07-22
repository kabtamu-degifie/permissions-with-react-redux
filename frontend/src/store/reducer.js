import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../services/Auth/user.slice";
import permissionReducer from "../services/Permission/permission.slice";

export default combineReducers({
  user: userReducer,
  permissions: permissionReducer,
});
