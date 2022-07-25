import React from "react";
import { Navigate } from "react-router-dom";
import { getLoggedInUser, hasPermission } from "./libs/permission";

function ProtectedRoute(props) {
  const loggedInUser = getLoggedInUser();
  let isPermitted = true;
  if (props.permissions) {
    isPermitted = hasPermission(...props.permissions);
  }

  if (!isPermitted || !loggedInUser) return <Navigate to="/login" replace />;
  return props.children;
}

export default ProtectedRoute;
