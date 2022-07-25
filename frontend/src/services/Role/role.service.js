import http from "../../libs/axios";
import { getToken } from "../../libs/local-storage";

const API_URL = "/v1/roles";

const fetch = async () => {
  http.setHeader(getToken());
  const response = await http.get(API_URL);
  return response.data;
};

const create = async (role) => {
  http.setHeader(getToken());
  const response = await http.post(API_URL, role);
  return response.data;
};

const update = async (params) => {
  http.setHeader(getToken());
  const response = await http.put(`${API_URL}/${params.id}`, params.role);
  return response.data;
};

const remove = async (params) => {
  http.setHeader(getToken());
  const response = await http.delete(`${API_URL}/${params.id}`, params.role);
  return response.data;
};

const roleService = { fetch, create, update, remove };

export default roleService;
