import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaCriticalRole, FaSignOutAlt } from "react-icons/fa";

import { MdAppRegistration } from "react-icons/md";
import { SiSpringsecurity } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../services/Auth/user.slice";
import { hasPermission, getLoggedInUser } from "../libs/permission";

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();
  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6">
        <div className="flex justify-start ">
          <NavLink
            to="/"
            className="whitespace-nowrap inline-flex items-center text-2xl text-gray-500 hover:text-gray-900"
          >
            <SiSpringsecurity className="mr-2" />
            Roles Example
          </NavLink>
          {hasPermission("view_role") ? (
            <NavLink
              to="/role"
              className={`${
                location.pathname === "/role"
                  ? "text-indigo-600 hover:text-indigo-700"
                  : null
              } ml-8 whitespace-nowrap inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900`}
            >
              <FaCriticalRole className="mr-2" />
              Roles
            </NavLink>
          ) : null}
        </div>

        <div className="flex items-center justify-end">
          {loggedInUser ? (
            <button onClick={logoutUser} className="btn-success-outline">
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={`${
                  location.pathname === "/login"
                    ? "text-indigo-600 hover:text-indigo-700"
                    : null
                } whitespace-nowrap inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900`}
              >
                <FaSignInAlt className="mr-2" />
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={`${
                  location.pathname === "/register"
                    ? "text-indigo-600 hover:text-indigo-700"
                    : null
                } ml-8 whitespace-nowrap inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900`}
              >
                <MdAppRegistration className="mr-2" />
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
