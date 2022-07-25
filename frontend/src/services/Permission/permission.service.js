import http from "../../libs/axios";
import { getToken } from "../../libs/local-storage";

const API_URL = "/v1/permissions";

const fetch = async () => {
  http.setHeader(getToken());
  const response = await http.get(API_URL);
  return response.data;
};

const permissionService = { fetch };

export default permissionService;
