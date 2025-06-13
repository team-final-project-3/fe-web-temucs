import React, { useState } from "react";
import logoTEMPORARY from "../../public/images/logoTEMPORARY.png";

import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import SidebarContext from "./SidebarContext";

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen bg-[#3D474B]">
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div
          className={`flex items-center ${
            expanded ? "justify-between px-3" : "justify-center"
          } h-16`}
        >
          <img
            src={logoTEMPORARY}
            alt="logo"
            className={`transition-all overflow-hidden${
              expanded ? "w-10 h-10 p-2 ml-1" : "w-0 h-0"
            }`}
          />
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

        <div className="border-t flex p-3">
          <div className="avatar avatar-placeholder">
            <div className="bg-amber-600 text-neutral-content w-12 rounded-full">
              <span>JD</span>
            </div>
          </div>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4 text-white">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-white/40">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
