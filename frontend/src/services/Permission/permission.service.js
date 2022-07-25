import http from "../../libs/axios";

// API
const API_URL = "/v1/permissions";

// fetch permission/s
const fetch = async () => {
  const response = await http.get(API_URL);
  return response.data;
};

const userService = { fetch };

export default userService;
