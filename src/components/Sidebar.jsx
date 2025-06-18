import React, { useState } from "react";
import temuCSLong from "../../public/images/temuCS_long.png";
import { ChevronFirst, ChevronLast, LogOut } from "lucide-react";
import SidebarContext from "./SidebarContext";
import ProfileAdmin from "../../public/images/profile_admin.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const data = jwtDecode(localStorage.getItem("token"));
  console.log(data);

  return (
    <>
      <aside className="h-screen bg-[#3D474B]">
        <nav className="h-full flex flex-col border-r shadow-sm">
          <div
            className={`flex items-center ${
              expanded ? "justify-between px-3" : "justify-center"
            } h-16`}
          >
            <NavLink to={"/dashboard"}>
              <img
                src={temuCSLong}
                alt="logo"
                className={`transition-all overflow-hidden ${
                  expanded ? "w-35 h-20 p-2 ml-1" : "w-0 h-0"
                }`}
              />
            </NavLink>
            <button
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={() => setExpanded((curr) => !curr)}
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3 items-center">
            <div className="avatar avatar-placeholder">
              <div className="bg-amber-600 text-neutral-content w-12 rounded-full">
                <img
                  src={ProfileAdmin}
                  alt="profil admin"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4 text-white">
                <h4 className="font-semibold">{data.fullname}</h4>
                <span className="text-xs text-white/40">{data.email}</span>
              </div>
              <div
                className="bg-white px-1 py-2 rounded-md cursor-pointer"
                onClick={() => setShowLogoutModal(true)}
              >
                <LogOut color={"#ff4122"} size={20} />
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Logout</h3>
            <p>Apakah kamu yakin ingin keluar dari akun?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="btn btn-sm"
              >
                Batal
              </button>
              <button onClick={handleLogout} className="btn btn-sm btn-error">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
