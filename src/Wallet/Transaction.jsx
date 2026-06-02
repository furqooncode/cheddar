import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import supabase from "../lib/util.jsx";
import useTheme from "../Client/Toggletheme.jsx";



function formatNaira(amount) {
  return "₦" + Number(amount || 0).toLocaleString("en-NG");
}

function formatDateTime(iso) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" }),
    time: d.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }),
  };
}

function resolveTransactionStatus(order) {
  const { status, paymentStatus } = order;
  if (paymentStatus === "failed") return "failed";
  if (paymentStatus === "pending") return "pending";
  if (["confirmed", "shipped", "delivered"].includes(status)) return "successful";
  return "pending";
}



function Shimmer({ className = "", style = {} }) {
  return (
    <div
      className={`animate-pulse rounded-xl ${className}`}
      style={{ background: "rgba(255,255,255,0.07)", ...style }}
    />
  );
}

function SkeletonPage({ colors }) {
  return (
    <div className="w-full px-4 pt-8 pb-24 min-h-screen" style={{ background: colors.background }}>
      <div className="w-full flex flex-col gap-4">
        <div className="px-1 pb-2 border-b" style={{ borderColor: colors.border }}>
          <Shimmer className="h-7 w-32 mb-1" />
          <Shimmer className="h-4 w-48" />
        </div>
        <div className="w-full rounded-3xl overflow-hidden border" style={{ borderColor: colors.border }}>
          <div className="h-0.5 w-full" style={{ background: colors.border }} />
          <div className="p-5 flex flex-col gap-4">
            <Shimmer className="h-4 w-24" />
            <Shimmer className="h-9 w-40" />
            <div className="flex gap-4 pt-1">
              <Shimmer className="h-10 w-28" />
              <Shimmer className="h-10 w-28" />
            </div>
          </div>
        </div>
        <div className="w-full rounded-3xl border p-5 flex items-center justify-between"
          style={{ background: colors.container, borderColor: colors.border }}>
          <div className="flex flex-col gap-2">
            <Shimmer className="h-3 w-16" />
            <Shimmer className="h-5 w-32" />
          </div>
          <Shimmer className="w-11 h-11 rounded-full" />
        </div>
        <div className="w-full rounded-3xl border overflow-hidden"
          style={{ background: colors.container, borderColor: colors.border }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: colors.border }}>
            <Shimmer className="h-5 w-28" />
            <Shimmer className="h-8 w-28 rounded-xl" />
          </div>
          <div className="px-5 flex flex-col">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 py-3.5 border-b last:border-0"
                style={{ borderColor: colors.border }}>
                <Shimmer style={{ width: 40, height: 44, borderRadius: 12, flexShrink: 0 }} />
                <div className="flex-1 flex flex-col gap-2">
                  <Shimmer className="h-4 w-3/4" />
                  <Shimmer className="h-3 w-1/2" />
                  <Shimmer className="h-5 w-20 rounded-full" />
                </div>
                <Shimmer className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



function ErrorPage({ colors, onRetry }) {
  return (
    <div className="w-full px-4 pt-8 pb-24 min-h-screen flex items-center justify-center"
      style={{ background: colors.background }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ background: "rgba(220,60,60,0.1)" }}>⚠️</div>
        <p className="text-sm font-semibold" style={{ color: colors.primaryText }}>Failed to load wallet</p>
        <p className="text-xs text-center" style={{ color: colors.secondaryText }}>
          Something went wrong while fetching your data.
        </p>
        <button
          onClick={onRetry}
          className="px-5 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: colors.accent + "22", color: colors.accent, border: `1px solid ${colors.border}` }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}



function StatusBadge({ status }) {
  const map = {
    successful: { label: "Successful", bg: "rgba(74,168,67,0.12)", color: "#4aa843" },
    pending:    { label: "Pending",    bg: "rgba(193,154,107,0.15)", color: "#c19a6b" },
    failed:     { label: "Failed",     bg: "rgba(220,60,60,0.12)",  color: "#dc3c3c" },
  };
  const s = map[status] || map.pending;
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-widest"
      style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}


function StackedImages({ products }) {
  const imgs = products.slice(0, 3);
  const extra = products.length - 3;
  return (
    <div className="relative flex items-center" style={{ width: imgs.length * 28 + 8, height: 44 }}>
      {imgs.map((p, i) => (
        <div key={i} className="absolute rounded-xl overflow-hidden border-2"
          style={{ left: i * 22, width: 40, height: 44, zIndex: i + 1,
            borderColor: "rgba(255,255,255,0.12)", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>
          <img src={p.image} alt={p.name} className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://placehold.co/40x44/1a1a1a/c19a6b?text=C"; }} />
        </div>
      ))}
      {extra > 0 && (
        <div className="absolute rounded-xl flex items-center justify-center text-xs font-bold"
          style={{ left: imgs.length * 22, width: 40, height: 44, zIndex: imgs.length + 1,
            background: "rgba(193,154,107,0.18)", color: "#c19a6b", border: "2px solid rgba(193,154,107,0.3)" }}>
          +{extra}
        </div>
      )}
    </div>
  );
}



function FilterDropdown({ selected, onChange, colors }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filters = [
    { key: "all",        label: "All",       icon: "fa-layer-group",  color: colors.accent },
    { key: "successful", label: "Successful", icon: "fa-check-circle", color: "#4aa843" },
    { key: "pending",    label: "Pending",    icon: "fa-clock",        color: "#c19a6b" },
    { key: "failed",     label: "Failed",     icon: "fa-times-circle", color: "#dc3c3c" },
  ];

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const active = filters.find((f) => f.key === selected) || filters[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 h-8 rounded-xl transition-all duration-200"
        style={{
          background: open ? colors.accent + "22" : "rgba(255,255,255,0.05)",
          border: `1px solid ${open ? colors.accent + "55" : colors.border}`,
        }}
      >
        <i className="fas fa-sliders text-xs transition-transform duration-300"
          style={{ color: colors.accent, transform: open ? "rotate(90deg)" : "rotate(0deg)" }} />
        <span className="text-xs font-semibold" style={{ color: active.color }}>{active.label}</span>
        <i className="fas fa-chevron-down text-xs transition-transform duration-300"
          style={{ color: colors.secondaryText, transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>

      <div className="absolute right-0 top-10 z-50 flex flex-col overflow-hidden rounded-2xl"
        style={{
          background: colors.container,
          border: `1px solid ${colors.border}`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          minWidth: 152,
          maxHeight: open ? 300 : 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "max-height 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
        }}
      >
        {filters.map((f, i) => {
          const isActive = selected === f.key;
          return (
            <button key={f.key}
              onClick={() => { onChange(f.key); setOpen(false); }}
              className="flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 hover:opacity-80"
              style={{
                background: isActive ? f.color + "18" : "transparent",
                borderBottom: i < filters.length - 1 ? `1px solid ${colors.border}` : "none",
              }}
            >
              <i className={`fas ${f.icon} text-xs w-4 text-center`} style={{ color: f.color }} />
              <span className="text-xs font-semibold" style={{ color: isActive ? f.color : colors.primaryText }}>
                {f.label}
              </span>
              {isActive && <i className="fas fa-check text-xs ml-auto" style={{ color: f.color }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}



function TransactionRow({ order, colors }) {
  const { date, time } = formatDateTime(order.created_at);
  const status = resolveTransactionStatus(order);
  const amount = order.amount || order.products?.reduce((s, p) => s + p.price * p.quantity, 0) || 0;

  return (
    <div className="flex items-center gap-3 py-3.5 border-b last:border-0" style={{ borderColor: colors.border }}>
      <div className="flex-shrink-0">
        <StackedImages products={order.products || []} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate leading-snug" style={{ color: colors.primaryText }}>
          {order.products?.length === 1
            ? order.products[0].name
            : `${order.products?.length} items · Order ${order.orderId}`}
        </p>
        <p className="text-xs mt-0.5" style={{ color: colors.secondaryText }}>{time} · {date}</p>
        <div className="mt-1"><StatusBadge status={status} /></div>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-bold"
          style={{ color: status === "failed" ? "#dc3c3c" : colors.primaryText }}>
          {status === "failed" ? "" : "-"}{formatNaira(amount)}
        </p>
        {status === "successful" && (
          <p className="text-xs mt-0.5" style={{ color: "#4aa843" }}>
            +{Math.floor(amount * 0.01).toLocaleString()} pts
          </p>
        )}
      </div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function Transaction() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState("all");

  const {
    data: { user } = {},
    isLoading: userLoading,
    isError: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data;
    },
  });

  const {
    data: wallet,
    isError: walletError,
    refetch: refetchWallet,
  } = useQuery({
    queryKey: ["wallet", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallet")
        .select("*")
        .eq("userId", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const {
    data: orders = [],
    isLoading: ordersLoading,
    isError: ordersError,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["orders-wallet", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, created_at, products, orderId, status, paymentStatus, amount")
        .eq("userId", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const isPageLoading = userLoading || (!!user && ordersLoading);
  const isPageError   = userError || walletError || ordersError;

  function handleRetry() {
    refetchUser();
    refetchWallet();
    refetchOrders();
  }

  if (isPageLoading) return <SkeletonPage colors={colors} />;
  if (isPageError)   return <ErrorPage colors={colors} onRetry={handleRetry} />;

  const totalSpent = wallet?.total_spent || 0;
  const cashback   = wallet?.cashback    || 0;

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return resolveTransactionStatus(order) === filter;
  });

  return (
    <div className="w-full px-4 pt-8 pb-24 min-h-screen" style={{ background: colors.background }}>
      <div className="w-full flex flex-col gap-4">

        {/* ── Page header ── */}
        <div className="px-1 pb-2 border-b" style={{ borderColor: colors.border }}>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: colors.primaryText }}>
            My Wallet
          </h1>
          <p className="text-xs mt-0.5" style={{ color: colors.secondaryText }}>
            Spending overview & history
          </p>
        </div>

        {/* ── Balance card ── */}
        <div className="w-full rounded-3xl border overflow-hidden"
          style={{ background: colors.container, borderColor: colors.border }}>
          <div className="h-0.5 w-full" style={{
            background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})`,
          }} />
          <div className="p-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs uppercase tracking-widest" style={{ color: colors.secondaryText }}>
                Total Spent
              </p>
              <button style={{ color: colors.secondaryText }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
                </svg>
              </button>
            </div>
            <p className="text-3xl font-bold tracking-tight mt-1" style={{ color: colors.primaryText }}>
              {formatNaira(totalSpent)}
            </p>
            <div className="flex gap-4 mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: colors.accent + "22" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs" style={{ color: colors.secondaryText }}>Cashback pts</p>
                  <p className="text-sm font-semibold" style={{ color: colors.primaryText }}>{cashback.toLocaleString()} pts</p>
                </div>
              </div>
              <div className="w-px" style={{ background: colors.border }} />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: colors.accent + "22" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5">
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs" style={{ color: colors.secondaryText }}>Total Orders</p>
                  <p className="text-sm font-semibold" style={{ color: colors.primaryText }}>{orders.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ── Transactions list ── */}
        <div className="w-full rounded-3xl border overflow-hidden"
          style={{ background: colors.container, borderColor: colors.border }}>
          <div className="px-5 py-3.5 flex items-center justify-between border-b"
            style={{ borderColor: colors.border }}>
            <h2 className="text-sm font-bold" style={{ color: colors.primaryText }}>Transactions</h2>
            <FilterDropdown selected={filter} onChange={setFilter} colors={colors} />
          </div>
          <div className="px-5">
            {filteredOrders.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm" style={{ color: colors.secondaryText }}>No transactions found</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <TransactionRow key={order.id} order={order} colors={colors} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
