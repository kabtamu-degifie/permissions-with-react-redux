import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getLoggedInUser, hasPermission } from "./libs/local-storage";

function ProtectedRoute(props) {
  const location = useLocation();
  const loggedInUser = getLoggedInUser();
  let isPermitted = true;
  if (props.permissions) {
    isPermitted = hasPermission(...props.permissions);
  }

  if (!isPermitted || !loggedInUser)
    return <Navigate state={location.pathname} to="/login" replace />;
  return props.children;
}

export default ProtectedRoute;
