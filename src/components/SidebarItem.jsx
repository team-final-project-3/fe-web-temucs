import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import SidebarContext from "./SidebarContext";

const SidebarItem = ({ icon, text, to }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-colors
        ${
          isActive
            ? "bg-white/10 text-white"
            : "hover:bg-white/30 text-gray-300"
        }`
      }
    >
      <div className="text-white">{icon}</div>
      <span
        className={`overflow-hidden transition-all text-white ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </NavLink>
  );
};

export default SidebarItem;
