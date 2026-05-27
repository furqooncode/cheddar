import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatCreatedAt } from './Orders.jsx';
import supabase from "../../lib/util.jsx";

const STATUSES = [
  { value: "pending",   label: "Pending",   color: "#FBBF24", bg: "rgba(251,191,36,0.12)" },
  { value: "confirmed", label: "Confirmed", color: "#4A7043", bg: "rgba(74,112,67,0.15)" },
  { value: "shipped",   label: "Shipped",   color: "#60A5FA", bg: "rgba(37,99,235,0.12)" },
  { value: "delivered", label: "Delivered", color: "#A78BFA", bg: "rgba(139,92,246,0.12)" },
  { value: "cancelled", label: "Cancelled", color: "#F87171", bg: "rgba(168,50,50,0.12)" },
];

const shimmer = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.6s infinite',
};

function Bone({ className, style }) {
  return <div className={`rounded-xl ${className}`} style={{ ...shimmer, ...style }} />;
}

function DetailsSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-16">
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
      {/* Header */}
      <div className="flex items-center gap-3">
        <Bone className="w-9 h-9" style={{ backgroundColor: "#2C2C2C" }} />
        <div className="flex flex-col gap-1.5">
          <Bone className="h-5 w-36" style={{ backgroundColor: "#2C2C2C" }} />
          <Bone className="h-3 w-24" style={{ backgroundColor: "#2C2C2C" }} />
        </div>
      </div>
      {/* Customer */}
      <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ backgroundColor: "#2C2C2C", borderColor: "#444444" }}>
        <Bone className="h-3 w-20" style={{ backgroundColor: "#333333" }} />
        <div className="flex items-center gap-4">
          <Bone className="w-14 h-14 rounded-full" style={{ backgroundColor: "#333333" }} />
          <div className="flex flex-col gap-2">
            <Bone className="h-4 w-32" style={{ backgroundColor: "#333333" }} />
            <Bone className="h-3 w-24" style={{ backgroundColor: "#333333" }} />
          </div>
        </div>
        {[1,2,3,4].map(i => (
          <div key={i} className="flex gap-3">
            <Bone className="w-7 h-7 rounded-lg" style={{ backgroundColor: "#333333" }} />
            <div className="flex flex-col gap-1">
              <Bone className="h-2 w-16" style={{ backgroundColor: "#333333" }} />
              <Bone className="h-3 w-32" style={{ backgroundColor: "#333333" }} />
            </div>
          </div>
        ))}
      </div>
      {/* Items */}
      <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ backgroundColor: "#2C2C2C", borderColor: "#444444" }}>
        <Bone className="h-3 w-20" style={{ backgroundColor: "#333333" }} />
        {[1,2].map(i => (
          <div key={i} className="flex items-center gap-3">
            <Bone className="w-14 h-14 rounded-xl" style={{ backgroundColor: "#333333" }} />
            <div className="flex-1 flex flex-col gap-1.5">
              <Bone className="h-3 w-3/4" style={{ backgroundColor: "#333333" }} />
              <Bone className="h-2 w-1/2" style={{ backgroundColor: "#333333" }} />
            </div>
            <Bone className="h-4 w-16" style={{ backgroundColor: "#333333" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function getColorHex(color) {
  if (!color) return "#888888";
  if (typeof color === "object" && color.hex) return color.hex;
  return color;
}

function getColorName(color) {
  if (!color) return "";
  if (typeof color === "object" && color.name) return color.name;
  return color;
}

function initials(name) {
  if (!name) return "??";
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function getTotal(products) {
  return (products || []).reduce((sum, p) => sum + (p.price || p.amount || 0) * (p.quantity || 1), 0);
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ backgroundColor: "#2C2C2C", borderColor: "#444444" }}>
      {title && (
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B0B0B0" }}>{title}</p>
      )}
      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(212,163,115,0.1)" }}>
        <i className={`fas ${icon} text-xs`} style={{ color: "#d4a373" }} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#B0B0B0" }}>{label}</p>
        <p className="text-sm font-medium" style={{ color: "#F5F5F5" }}>{value || "—"}</p>
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, onClick, variant = "default" }) {
  const styles = {
    default: { bg: "rgba(255,255,255,0.04)", border: "#444444",                 color: "#F5F5F5" },
    gold:    { bg: "rgba(212,163,115,0.1)",  border: "rgba(212,163,115,0.25)", color: "#d4a373" },
    green:   { bg: "rgba(74,112,67,0.12)",   border: "rgba(74,112,67,0.3)",    color: "#4A7043" },
    red:     { bg: "rgba(168,50,50,0.12)",   border: "rgba(248,113,113,0.3)",  color: "#F87171" },
    blue:    { bg: "rgba(37,99,235,0.1)",    border: "rgba(96,165,250,0.25)",  color: "#60A5FA" },
  };
  const s = styles[variant];
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all hover:opacity-80 active:scale-95"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      <i className={`fas ${icon} text-xs`} />
      {label}
    </button>
  );
}

export default function DashOrderdetails() {
  const { state: orderFromState } = useLocation();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  // Fetch from Supabase if no state passed (direct URL)
  const { data: fetchedOrder, isPending } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("orderId", orderId)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !orderFromState && !!orderId,
  });

  const order = orderFromState || fetchedOrder;

  const [status, setStatus] = useState(order?.status || "pending");

  if (isPending && !orderFromState) return <DetailsSkeleton />;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <i className="fas fa-box-open text-3xl" style={{ color: "#444444" }} />
        <p className="text-sm" style={{ color: "#B0B0B0" }}>Order not found.</p>
        <button
          className="px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "#d4a373", color: "#1A1A1A" }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { date, time } = formatCreatedAt(order.created_at);
  const products = order.products || [];
  const total = order.amount || getTotal(products);

  const handleSaveStatus = async () => {
    setSavingStatus(true);
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", order.id)
      .select()
    setSavingStatus(false);
    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["order", orderId]);
      alert(`Status updated to: ${status}`);
    }
  };

  const handleDeleteOrder = async () => {
    if (!confirm("Delete this order permanently?")) return;
    const { error } = await supabase.from("orders").delete().eq("id", order.id);
    if (error) {
      alert("Failed to delete: " + error.message);
    } else {
      queryClient.invalidateQueries(["orders"]);
      navigate("/dashboard/orders");
    }
  };

  const handleSendMail = () => {
    if (!mailSubject.trim() || !mailBody.trim()) return;
    setMailSent(true);
    setTimeout(() => {
      setMailSent(false);
      setMailSubject("");
      setMailBody("");
    }, 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-16">
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/10"
          style={{ border: "1px solid #444444", color: "#B0B0B0" }}
        >
          <i className="fas fa-arrow-left text-xs" />
        </button>
        <div>
          <h2 className="text-lg font-bold tracking-tight" style={{ color: "#F5F5F5" }}>
            Order #{order.orderId}
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs" style={{ color: "#B0B0B0" }}>{date}</p>
            <span className="text-[10px] font-semibold" style={{ color: "#d4a373" }}>{time}</span>
          </div>
        </div>
        <div className="ml-auto">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
            style={{
              background: order.paymentStatus === "paid" ? "rgba(74,112,67,0.15)" : "rgba(251,191,36,0.12)",
              color: order.paymentStatus === "paid" ? "#4A7043" : "#FBBF24",
            }}
          >
            <i className={`fas ${order.paymentStatus === "paid" ? "fa-check-circle" : "fa-clock"} mr-1.5`} />
            {order.paymentStatus || "pending"}
          </span>
        </div>
      </div>

      {/* Customer */}
      <Section title="Customer">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
            style={{ backgroundColor: "rgba(212,163,115,0.15)", color: "#d4a373" }}
          >
            {initials(order.customername)}
          </div>
          <div>
            <p className="text-base font-bold" style={{ color: "#F5F5F5" }}>{order.customername}</p>
            <p className="text-xs" style={{ color: "#B0B0B0" }}>
              {[order.city, order.state, order.country].filter(Boolean).join(", ")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-1">
          <InfoRow icon="fa-envelope"       label="Email"         value={order.email} />
          <InfoRow icon="fa-phone"          label="Phone Number"  value={order.phone} />
          <InfoRow icon="fa-map-marker-alt" label="Order Address" value={order.address} />
          <InfoRow icon="fa-globe"          label="Location"      value={[order.city, order.state, order.country].filter(Boolean).join(", ")} />
        </div>
      </Section>

      {/* Order Items */}
      <Section title="Order Items">
        <div className="flex flex-col gap-3">
          {products.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ border: "1px solid #444444" }}>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "#F5F5F5" }}>{item.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#B0B0B0" }}>
                    {item.size}
                  </span>
                  <span
                    className="w-3 h-3 rounded-full border flex-shrink-0"
                    style={{ backgroundColor: getColorHex(item.color), borderColor: "rgba(255,255,255,0.2)" }}
                    title={getColorName(item.color)}
                  />
                  <span className="text-[10px]" style={{ color: "#B0B0B0" }}>×{item.quantity || 1}</span>
                </div>
              </div>
              <p className="text-sm font-bold flex-shrink-0" style={{ color: "#d4a373" }}>
                ₦{((item.price || item.amount || 0) * (item.quantity || 1)).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: "#444444" }}>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B0B0B0" }}>Total</p>
          <p className="text-xl font-black" style={{ color: "#F5F5F5" }}>₦{total.toLocaleString()}</p>
        </div>
      </Section>

      {/* Status updater */}
      <Section title="Order Status">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatus(s.value)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: status === s.value ? s.bg : "rgba(255,255,255,0.03)",
                border: `1px solid ${status === s.value ? s.color : "#444444"}`,
                color: status === s.value ? s.color : "#B0B0B0",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </button>
          ))}
        </div>
        <button
          className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-80 disabled:opacity-50"
          style={{ background: "#d4a373", color: "#1A1A1A" }}
          onClick={handleSaveStatus}
          disabled={savingStatus}
        >
          {savingStatus ? "Saving..." : "Save Status"}
        </button>
      </Section>

      {/* Order actions */}
      <Section title="Order Actions">
        <div className="flex flex-wrap gap-2">
          <ActionBtn icon="fa-location-arrow" label="Track Order"   variant="blue"  onClick={() => alert("Track")} />
          <ActionBtn icon="fa-check-circle"   label="Confirm Order" variant="green" onClick={() => setStatus("confirmed")} />
        </div>
        <div className="flex flex-wrap gap-2">
          <ActionBtn icon="fa-undo"  label="Refund"       variant="gold" onClick={() => alert("Refund")} />
          <ActionBtn icon="fa-trash" label="Delete Order" variant="red"  onClick={handleDeleteOrder} />
        </div>
      </Section>

      {/* Mail customer */}
      <Section title="Mail Customer">
        <p className="text-xs" style={{ color: "#B0B0B0" }}>
          Send a message directly to <span style={{ color: "#d4a373" }}>{order.email}</span>
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-widest" style={{ color: "#B0B0B0" }}>Subject</label>
            <input
              type="text"
              placeholder="e.g. Your order has been shipped"
              value={mailSubject}
              onChange={(e) => setMailSubject(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #444444", color: "#F5F5F5", caretColor: "#d4a373" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-widest" style={{ color: "#B0B0B0" }}>Message</label>
            <textarea
              rows={4}
              placeholder="Write your message to the customer..."
              value={mailBody}
              onChange={(e) => setMailBody(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm outline-none resize-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #444444", color: "#F5F5F5", caretColor: "#d4a373" }}
            />
          </div>
          <button
            onClick={handleSendMail}
            disabled={!mailSubject.trim() || !mailBody.trim()}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: mailSent ? "rgba(74,112,67,0.2)" : "rgba(212,163,115,0.12)",
              border: `1px solid ${mailSent ? "#4A7043" : "rgba(212,163,115,0.25)"}`,
              color: mailSent ? "#4A7043" : "#d4a373",
            }}
          >
            <i className={`fas ${mailSent ? "fa-check" : "fa-paper-plane"} text-xs`} />
            {mailSent ? "Message Sent!" : "Send Message"}
          </button>
        </div>
      </Section>

    </div>
  );
}
