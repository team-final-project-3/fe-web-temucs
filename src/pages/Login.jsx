import React, { useState } from "react";
import LogoTemuNoBg from "../../public/images/logo_temu_no_bg.png";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", { username, password });
      console.log(response.data);

      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("username", response.data.username);
        navigate("/dashboard");
      }

      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-[#F6F5F2] h-screen flex flex-col justify-center items-center">
      <div className="cont w-80">
        <div>
          <img src={LogoTemuNoBg} alt="logo" />
        </div>
        <div>
          <form className="flex flex-col gap-5">
            <h1 className="text-center font-bold">Sign In as Super Admin</h1>
            <input
              className="input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <NavLink
              to={"/dashboard"}
              type="submit"
              className="btn bg-[#F27F0C] uppercase text-white"
              onClick={handleLogin}
            >
              Login
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
