import http from "../../libs/axios";
import jwtDecoder from "jwt-decode";

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
    const decodedData = jwtDecoder(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodedData));
    return response.data;
  }
};

const userService = {
  register,
  login,
};

export default userService;
