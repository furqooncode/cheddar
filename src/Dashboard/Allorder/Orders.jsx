import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/util.jsx";
import { useQuery } from "@tanstack/react-query";

export const formatCreatedAt = (created_at) => {
  const d = new Date(created_at);
  const date = d.toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  const h12 = hours % 12 || 12;
  const time = `${h12}:${minutes}${ampm}`;
  return { date, time };
};

const STATUS = {
  confirmed: { label: "Confirmed", bg: "rgba(74,112,67,0.15)",  color: "#4A7043" },
  pending:   { label: "Pending",   bg: "rgba(251,191,36,0.12)", color: "#FBBF24" },
  shipped:   { label: "Shipped",   bg: "rgba(37,99,235,0.12)",  color: "#60A5FA" },
  delivered: { label: "Delivered", bg: "rgba(139,92,246,0.12)", color: "#A78BFA" },
  cancelled: { label: "Cancelled", bg: "rgba(168,50,50,0.12)",  color: "#F87171" },
};

const ALL_STATUSES = ["All Status", "confirmed", "pending", "shipped", "delivered", "cancelled"];

const shimmer = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.6s infinite',
};

function Bone({ className, style }) {
  return <div className={`rounded-xl ${className}`} style={{ ...shimmer, ...style }} />;
}

function OrdersSkeleton() {
  return (
    <div className="space-y-6">
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

      {/* Header */}
      <div className="space-y-2">
        <Bone className="h-7 w-32" style={{ backgroundColor: "#2C2C2C" }} />
        <Bone className="h-4 w-56" style={{ backgroundColor: "#2C2C2C" }} />
      </div>

      {/* Stat cards */}
      <div className="flex flex-wrap gap-3">
        {[1,2,3,4].map((i) => (
          <div key={i} className="flex-1 min-w-[130px] rounded-xl p-4 border" style={{ backgroundColor: "#2C2C2C", borderColor: "#444444" }}>
            <Bone className="h-3 w-20 mb-2" style={{ backgroundColor: "#333333" }} />
            <Bone className="h-7 w-12" style={{ backgroundColor: "#333333" }} />
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex gap-3">
        <Bone className="flex-1 h-12" style={{ backgroundColor: "#2C2C2C" }} />
        <Bone className="w-36 h-12" style={{ backgroundColor: "#2C2C2C" }} />
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#444444" }}>
        <div className="h-10 border-b" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#444444" }} />
        {[1,2,3,4,5].map((i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3 border-b" style={{ borderColor: "#333333" }}>
            <Bone className="h-3 w-4" style={{ backgroundColor: "#2C2C2C" }} />
            <div className="flex items-center gap-2">
              <Bone className="w-9 h-9 rounded-lg" style={{ backgroundColor: "#2C2C2C" }} />
              <Bone className="h-3 w-24" style={{ backgroundColor: "#2C2C2C" }} />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Bone className="w-8 h-8 rounded-full" style={{ backgroundColor: "#2C2C2C" }} />
              <div className="space-y-1">
                <Bone className="h-3 w-24" style={{ backgroundColor: "#2C2C2C" }} />
                <Bone className="h-2 w-20" style={{ backgroundColor: "#2C2C2C" }} />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Bone className="h-3 w-20" style={{ backgroundColor: "#2C2C2C" }} />
              <Bone className="h-6 w-16 rounded-full" style={{ backgroundColor: "#2C2C2C" }} />
              <Bone className="h-7 w-16 rounded-lg" style={{ backgroundColor: "#2C2C2C" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function initials(name) {
  if (!name) return "??"
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function getTotal(products) {
  return (products || []).reduce((sum, p) => sum + (p.price || p.amount || 0) * (p.quantity || 1), 0);
}

function StackedImages({ products }) {
  const shown = products.slice(0, 2);
  const rest = products.length - 2;
  const totalWidth = shown.length === 1 ? 36 : 36 + (shown.length - 1) * 18 + (rest > 0 ? 18 : 0);

  return (
    <div className="relative flex-shrink-0" style={{ width: totalWidth, height: 36 }}>
      {shown.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-lg overflow-hidden border-2"
          style={{ width: 36, height: 36, left: i * 18, zIndex: shown.length - i, borderColor: "#1a1a1a" }}
        >
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        </div>
      ))}
      {rest > 0 && (
        <div
          className="absolute rounded-lg flex items-center justify-center text-[10px] font-bold border-2"
          style={{ width: 36, height: 36, left: shown.length * 18, zIndex: 0, borderColor: "#1a1a1a", backgroundColor: "#2C2C2C", color: "#d4a373" }}
        >
          +{rest}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap"
      style={{ background: s.bg, color: s.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
      {s.label}
    </span>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="flex-1 min-w-[130px] rounded-xl p-4 border" style={{ backgroundColor: "#2C2C2C", borderColor: "#444444" }}>
      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#B0B0B0" }}>{label}</p>
      <p className="text-2xl font-bold" style={{ color: color || "#F5F5F5" }}>{value}</p>
    </div>
  );
}

export default function Orders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchFocused, setSearchFocused] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { data: orders = [], isPending, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) throw new Error(error.message);
      return data;
    }
  });

  const filtered = useMemo(() => {
    if (!orders.length) return [];
    return orders.filter((o) => {
      const term = search.toLowerCase();
      const matchSearch =
        !search ||
        (o.orderId || "").toLowerCase().includes(term) ||
        (o.customername || "").toLowerCase().includes(term) ||
        (o.products?.[0]?.name || "").toLowerCase().includes(term);
      const matchStatus = statusFilter === "All Status" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter, orders]);

  const counts = useMemo(() => ({
    total:     orders.length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }), [orders]);

  const handleDelete = (id) => {
    if (!confirm("Delete this order?")) return;
    setDeletingId(id);
    setTimeout(() => setDeletingId(null), 1000);
  };

  if (isPending) return <OrdersSkeleton />;
  if (isError) return <p className="text-red-400 text-sm p-4">{error.message}</p>;

  return (
    <div className="space-y-6" style={{ color: "#F5F5F5" }}>

      <div>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#F5F5F5" }}>Orders</h2>
        <p className="text-sm mt-0.5" style={{ color: "#B0B0B0" }}>Manage and track all customer orders</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <StatCard label="Total Orders" value={counts.total} />
        <StatCard label="Confirmed"    value={counts.confirmed} color="#4A7043" />
        <StatCard label="Delivered"    value={counts.delivered} color="#A78BFA" />
        <StatCard label="Cancelled"    value={counts.cancelled} color="#F87171" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <i
            className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
            style={{ color: searchFocused ? "#d4a373" : "#B0B0B0" }}
          />
          <input
            type="text"
            placeholder="Search by name, Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-10 pr-10 py-3 rounded-xl text-sm"
            style={{
              background: searchFocused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
              border: `1.5px solid ${searchFocused ? "#d4a373" : "#444444"}`,
              color: "#F5F5F5",
              outline: "none",
              caretColor: "#d4a373",
            }}
          />
          {search && (
            <button className="absolute right-4 top-1/2 -translate-y-1/2" onClick={() => setSearch("")} style={{ color: "#B0B0B0" }}>
              <i className="fas fa-times text-xs" />
            </button>
          )}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl text-sm font-medium"
          style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid #444444", color: "#F5F5F5", outline: "none", minWidth: 150 }}
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s} style={{ background: "#2C2C2C" }}>
              {s === "All Status" ? "All Status" : STATUS[s]?.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border overflow-x-auto w-full" style={{ borderColor: "#444444" }}>
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "#444444" }}>
              {["#", "Product", "Customer", "Date & Time", "Order ID", "Amount", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest" style={{ color: "#B0B0B0" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, index) => {
    const isDeleting = deletingId === order.id;
  const products = order.products || [];
const firstName = products[0]?.name || "";
const extraCount = products.length - 1;
  const itemLabel = extraCount > 0 ? `${firstName} +${extraCount} more` : firstName;
  const { date, time } = formatCreatedAt(order.created_at);


              return (
                <tr
                  key={order.id}
                  className="border-b transition-colors hover:bg-white/5"
                  style={{ borderColor: "#333333", opacity: isDeleting ? 0.4 : 1 }}
                >
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono" style={{ color: "#666666" }}>{index + 1}</span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {products.length > 0 && <StackedImages products={products} />}
                      <div className="min-w-0" style={{ maxWidth: 140 }}>
                        <p className="text-xs font-medium truncate" style={{ color: "#F5F5F5" }}>{itemLabel}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: "#d4a37322", color: "#d4a373" }}
                      >
             {initials(order.customername)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: "#F5F5F5", maxWidth: 110 }}>{order.customername}</p>
                        <p className="text-[10px] truncate" style={{ color: "#B0B0B0", maxWidth: 110 }}>{order.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-xs font-medium" style={{ color: "#F5F5F5" }}>{date}</p>
                    <p className="text-[10px] font-semibold mt-0.5" style={{ color: "#d4a373" }}>{time}</p>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-mono text-xs" style={{ color: "#60A5FA" }}>#{order.orderId}</span>
                  </td>

                  <td className="px-4 py-3">
                   
      <p className="text-xs font-semibold" 
       style={{
       color: "#F5F5F5"
       }}>
            ₦{(order.amount).toLocaleString()}
      </p>
                    <p className="text-[10px]" style={{ color: "#B0B0B0" }}>{order.paymentMethod}</p>
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/orders/${order.orderId}`, { state: order })}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                        style={{ background: "rgba(212,163,115,0.1)", border: "1px solid rgba(212,163,115,0.2)", color: "#d4a373" }}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        disabled={isDeleting}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #444444", color: "#B0B0B0" }}
                        title="Delete order"
                      >
                        {isDeleting
                          ? <span className="w-3 h-3 border-2 rounded-full animate-spin" style={{ borderColor: "#44444440", borderTopColor: "#F87171" }} />
                          : <i className="fas fa-trash text-xs" />
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center">
                  <i className="fas fa-box-open text-3xl mb-3 block" style={{ color: "#444444" }} />
                  <p className="text-sm" style={{ color: "#B0B0B0" }}>
                    {search || statusFilter !== "All Status" ? "No orders match your search" : "No orders yet"}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs" style={{ color: "#555555" }}>
        Showing {filtered.length} of {orders.length} orders
      </p>
    </div>
  );
}
