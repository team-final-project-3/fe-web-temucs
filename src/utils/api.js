import axios from "axios";

const api = axios.create({
  baseURL: "https://3fd5pjgv-3000.asse.devtunnels.ms/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token && role === "admin") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
