import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaCriticalRole } from "react-icons/fa";

import { MdAppRegistration } from "react-icons/md";
import { SiSpringsecurity } from "react-icons/si";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <NavLink
            to="/"
            className="whitespace-nowrap inline-flex items-center text-2xl text-gray-500 hover:text-gray-900"
          >
            <SiSpringsecurity className="mr-2" />
            Roles Example
          </NavLink>
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
        </div>

        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 ">
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
        </div>
      </div>
    </div>
  );
};

export default NavBar;
