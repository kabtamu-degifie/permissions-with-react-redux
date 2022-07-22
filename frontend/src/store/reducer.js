import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../services/Auth/user.slice";
import permissionReducer from "../services/Permission/permission.slice";
import roleReducer from "../services/Role/role.slice";

export default combineReducers({
  user: userReducer,
  permissions: permissionReducer,
  roles: roleReducer,
});
