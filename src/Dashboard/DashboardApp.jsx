import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Overview from "./pages/Overview";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

export default function DashboardApp() {
  const [page, setPage] = useState("Overview");
  return (
    <div className="flex bg-[#0b0b0b] min-h-screen">
      <Sidebar page={page} setPage={setPage} />
      <main className="flex-1 p-8">
        <Topbar title={page} />
        {page === "Overview" && <Overview />}
        {page === "Orders" && <Orders />}
        {page === "Products" && <Products />}
      </main>
    </div>
  );
}
