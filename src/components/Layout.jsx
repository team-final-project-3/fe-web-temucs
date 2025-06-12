import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  Building2,
  Users,
  CalendarPlus,
  NotebookText,
  BookUser,
  UserRoundCog,
  House,
  LogOut,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import DayDate from "./DayDate";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar>
        <SidebarItem
          icon={<House size={20} />}
          text="Beranda"
          to="/dashboard"
        />
        <SidebarItem
          icon={<Building2 size={20} />}
          text="Cabang"
          to="/cabang"
        />
        <SidebarItem icon={<Users size={20} />} text="Nasabah" to="/nasabah" />
        <SidebarItem
          icon={<CalendarPlus size={20} />}
          text="Libur"
          to="/libur"
        />
        <SidebarItem
          icon={<NotebookText size={20} />}
          text="Layanan"
          to="/layanan"
        />
        <SidebarItem
          icon={<BookUser size={20} />}
          text="Antrian"
          to="/antrian"
        />
        <SidebarItem
          icon={<UserRoundCog size={20} />}
          text="Profil"
          to="/profil"
        />
        <SidebarItem icon={<LogOut size={20} />} text="Keluar" to="/logout" />
      </Sidebar>

      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <div className="flex justify-between items-center px-6">
            <Breadcrumbs />
            <DayDate />
          </div>
          <main className="flex-1 overflow-auto mb-10 px-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
