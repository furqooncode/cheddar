import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/util.jsx";

const menuItems = [
  { 
    label: "Overview", 
    path: "/dashboard/overview", 
    icon: "fas fa-home" 
  },
  { 
    label: "Orders", 
    path: "/dashboard/orders", 
    icon: "fas fa-shopping-cart" 
  },
  { 
    label: "Products", 
    path: "/dashboard/products", 
    icon: "fas fa-boxes" 
  },
  { 
    label: "Add Product", 
    path: "/dashboard/addproduct", 
    icon: "fas fa-plus-circle" 
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/Login');
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-[#070707] text-[#d4a373] rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl`} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 bg-[#070707] text-white p-6
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-[#d4a373] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">C</span>
          </div>
          <h1 className="text-3xl font-bold text-[#d4a373]">CHEDDAR</h1>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#d4a373] text-black font-semibold shadow-md"
                    : "hover:bg-white/10 text-gray-300 hover:text-white"
                }`
              }
            >
              <i className={`${item.icon} text-lg w-5`} />
              {item.label}
            </NavLink>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 mt-6"
          >
            <i className="fas fa-sign-out-alt text-lg w-5" />
            Log Out
          </button>
        </nav>
      </aside>
    </>
  );
}