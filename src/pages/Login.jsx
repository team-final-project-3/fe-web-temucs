import React, { useEffect, useState } from "react";
import temuCSLongDark from "../../public/images/temuCS_long_dark.png";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "admin") {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Invalid token:", err.message);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/users/login", { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
      setError("Username atau password salah!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F6F5F2] h-screen flex flex-col justify-center items-center">
      <div className="cont w-80">
        <div>
          <img src={temuCSLongDark} alt="logo" />
        </div>
        <div>
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <h1 className="text-center font-bold">Sign In as Super Admin</h1>

            {error && (
              <div
                role="alert"
                className="alert alert-error alert-outline text-sm"
              >
                <span>{error}</span>
              </div>
            )}

            <input
              className="input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className={`btn uppercase text-white ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#F27F0C]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
