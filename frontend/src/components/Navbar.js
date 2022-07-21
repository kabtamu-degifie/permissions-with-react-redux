import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaCriticalRole } from "react-icons/fa";
import { SiSpringsecurity } from "react-icons/si";

const NavBar = () => {
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
            className="ml-8 whitespace-nowrap inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900"
          >
            <FaCriticalRole className="mr-2" />
            Roles
          </NavLink>
        </div>

        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <NavLink
            to="/login"
            className="whitespace-nowrap inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900"
          >
            <FaSignInAlt className="mr-2" />
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="ml-8 whitespace-nowrap inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900"
          >
            <FaSignOutAlt className="mr-2" />
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
