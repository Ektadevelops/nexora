import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <Topbar />

      <main className="ml-64 pt-16">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;