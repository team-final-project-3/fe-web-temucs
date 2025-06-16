import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "https://3fd5pjgv-3000.asse.devtunnels.ms/api/",
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
      // if (role === "cs") {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
    } catch (error) {
      console.error("Failed to decode token:", error.message);
      localStorage.removeItem("token");
    }
  }

  return config;
});

export default api;
