import axios from "axios";

const API_BASE = "http://localhost:8000";

export const loginApi = (email, password) => {
  return axios.post(`${API_BASE}/login`, { email, password });
};
