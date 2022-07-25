import axios from "axios";
import { getToken } from "./permission";
const token = getToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}

const setHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.response.use(null, (error) => {
  const serverError = error && error.response && error.response.status === 500;
  if (serverError) {
    console.log("Server error", error.response.data);
  }
  return Promise.reject(error.response.data);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setHeader,
};

export default http;
