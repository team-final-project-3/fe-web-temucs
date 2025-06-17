import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const data = jwtDecode(token);
      const role = data.role;

      if (role === "admin") {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to decode token:", error.message);
      localStorage.removeItem("token");
    }
  }

  return config;
});

export default api;
