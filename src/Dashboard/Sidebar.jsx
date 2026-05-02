import { useState } from "react";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Overview", path: "/dashboard/overview" },
  { label: "Orders", path: "/dashboard/orders" },
  { label: "Products", path: "/dashboard/products" },
  { label: "AddProducts", path: "/dashboard/addproduct" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#070707] text-[#d4a373] rounded-lg border border-white/10"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <i className="fas fa-times text-lg" />
        ) : (
          <i className="fas fa-bars text-lg" />
        )}
      </button>

      {/* Backdrop (mobile only) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 bg-[#070707] text-white p-6
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        <h1 className="text-2xl font-bold text-[#d4a373] mb-8">CHEDDAR</h1>
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-[#d4a373] text-black font-semibold"
                  : "hover:bg-white/10 text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </aside>
    </>
  );
}
