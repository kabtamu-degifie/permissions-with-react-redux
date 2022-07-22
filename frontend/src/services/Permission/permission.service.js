import http from "../../libs/axios";

// API
const API_URL = "/v1/permissions";

// fetch permission/s
const fetch = async () => {
  const token = localStorage.getItem("token");
  http.setHeaders(token);
  const response = await http.get(API_URL);
  return response.data;
};

const userService = {
  fetch,
};

export default userService;
