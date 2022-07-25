import http from "../../libs/axios";
import { setToken, removeToken } from "../../libs/local-storage";

const API_URL = "/v1/auth";

const login = async (userData) => {
  const response = await http.post(API_URL, userData);
  if (response.data?.token) {
    setToken(response.data.token);
    return response.data;
  }
};

const logout = () => removeToken();

const authService = { login, logout };

export default authService;
