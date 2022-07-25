import http from "../../libs/axios";

const API_URL = "/v1/users";

const register = async (user) => {
  const response = await http.post(API_URL, user);
  return response.data;
};

const userService = { register };

export default userService;
