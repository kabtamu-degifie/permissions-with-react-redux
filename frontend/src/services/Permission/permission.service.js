import http from "../../libs/axios";
import { getToken } from "../../libs/permission";

// API
const API_URL = "/v1/permissions";

// fetch permission/s
const fetch = async () => {
  http.setHeader(getToken());
  const response = await http.get(API_URL);
  return response.data;
};

const userService = { fetch };

export default userService;
