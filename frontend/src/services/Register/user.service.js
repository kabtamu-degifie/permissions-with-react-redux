import http from "../../libs/axios";

//API
const USER_API_URL = "/v1/users";

//Register user
const register = async (userData) => {
  const response = await http.post(USER_API_URL, userData);
  return response.data;
};

const userService = {
  register,
};

export default userService;
