import React from "react";
import LogoTemuCS from "../../public/images/logo_temucs.png";
import { IoExitOutline } from "react-icons/io5";
const Navbar = () => {
  console.log(LogoTemuCS);

  return (
    <div className="h-16 bg-white flex items-center px-4 py-4 shadow-md z-10">
      <div className="flex-1 px-3">TemuCS 1.0</div>
    </div>
  );
};

export default Navbar;
