import http from "../../libs/axios";

// API
const API_URL = "/v1/roles";
// fetch role/s
const fetch = async () => {
  const response = await http.get(API_URL);
  return response.data;
};

// create role
const create = async (role) => {
  const response = await http.post(API_URL, role);
  return response.data;
};

// fetch role/s
const update = async (params) => {
  const response = await http.put(API_URL + "/" + params.id, params.role);
  return response.data;
};

// fetch role/s
const remove = async (role) => {
  const response = await http.delete(API_URL);
  return response.data;
};

const userService = { fetch, create, update, remove };

export default userService;
