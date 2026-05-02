import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function DashboardApp() {
  const location = useLocation();

  // Derive page title from URL
  const segment = location.pathname.split("/").pop();
  const title = segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <div className="flex bg-[#0b0b0b] min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-hidden p-8">
        <Topbar title={title} />
        <Outlet />
      </main>
    </div>
  );
}
