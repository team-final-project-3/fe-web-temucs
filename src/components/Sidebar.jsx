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
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
