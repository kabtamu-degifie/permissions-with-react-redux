import http from "../../libs/axios";
// API
const USER_API_URL = "/v1/users";
const AUTH_API_URL = "/v1/auth";

// Register user
const register = async (userData) => {
  const response = await http.post(USER_API_URL, userData);
  return response.data;
};

// Login
const login = async (userData) => {
  const response = await http.post(AUTH_API_URL, userData);
  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
};

// logout
const logout = () => {
  return localStorage.removeItem("token");
};

const userService = {
  register,
  login,
  logout,
};

export default userService;
