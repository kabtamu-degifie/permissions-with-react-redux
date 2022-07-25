import http from "../../libs/axios";
import { getToken } from "../../libs/permission";

// API
const API_URL = "/v1/roles";

// fetch role/s
const fetch = async () => {
  http.setHeader(getToken());
  const response = await http.get(API_URL);
  return response.data;
};

// create role
const create = async (role) => {
  http.setHeader(getToken());
  const response = await http.post(API_URL, role);
  return response.data;
};

// fetch role/s
const update = async (params) => {
  http.setHeader(getToken());
  const response = await http.put(API_URL + "/" + params.id, params.role);
  return response.data;
};

// fetch role/s
const remove = async (role) => {
  http.setHeader(getToken());
  const response = await http.delete(API_URL);
  return response.data;
};

const userService = { fetch, create, update, remove };

export default userService;
