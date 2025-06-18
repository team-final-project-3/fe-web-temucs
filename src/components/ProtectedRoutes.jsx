import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const data = jwtDecode(token);
    const role = data.role;

    if (role !== "admin") {
      return <Navigate to="/" replace />;
    }

    return children;
    // next dev: buat token bearer
  } catch (error) {
    console.error("Invalid token:", error.message);
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoutes;
