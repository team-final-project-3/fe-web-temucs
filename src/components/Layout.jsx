import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import DayDate from "./DayDate";
import NotDesktop from "../pages/NotDesktop";
import {
  Building2,
  CalendarPlus,
  NotebookText,
  BookUser,
  House,
  FileText,
} from "lucide-react";

const Layout = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDesktop) {
    return <NotDesktop />;
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
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
          icon={<FileText size={20} />}
          text="Dokumen"
          to="/dokumen"
        />
      </Sidebar>

      <div className="flex flex-col flex-1 h-screen">
        <Navbar />
        <div className="flex-1 overflow-auto flex flex-col">
          <div className="flex justify-between items-center px-6 pt-4">
            <Breadcrumbs />
            <DayDate />
          </div>
          <main className="flex-1 px-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
