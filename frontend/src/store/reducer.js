import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../services/Auth/auth.slice";
import userReducer from "../services/User/user.slice";
import permissionReducer from "../services/Permission/permission.slice";
import roleReducer from "../services/Role/role.slice";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  permissions: permissionReducer,
  roles: roleReducer,
});
