import React from "react";
import { jwtDecode } from "jwt-decode";

const Welcome = () => {
  const data = jwtDecode(localStorage.getItem("token"));
  return (
    <div>
      Welcome, <strong> {data.fullname}</strong>
    </div>
  );
};

export default Welcome;
