import useTheme from "../Client/Toggletheme.jsx";
const transactions = [
  {
    id: 1,
    type: "received",
    description: "Wallet Top-up",
    amount: "₦15,000.00",
    status: "successful",
    date: "Today, 10:42 AM",
  },
  {
    id: 2,
    type: "sent",
    description: "Cheddar Purchase",
    amount: "₦8,500.00",
    status: "successful",
    date: "Today, 9:15 AM",
  },
  {
    id: 3,
    type: "sent",
    description: "Order #CHD-4821",
    amount: "₦22,000.00",
    status: "failed",
    date: "Yesterday, 6:30 PM",
  },
  {
    id: 4,
    type: "received",
    description: "Refund — Order #CHD-4801",
    amount: "₦5,200.00",
    status: "successful",
    date: "Yesterday, 2:10 PM",
  },
  {
    id: 5,
    type: "sent",
    description: "Cheddar Purchase",
    amount: "₦12,750.00",
    status: "successful",
    date: "Mar 5, 11:00 AM",
  },
  {
    id: 6,
    type: "received",
    description: "Wallet Top-up",
    amount: "₦30,000.00",
    status: "successful",
    date: "Mar 4, 8:55 AM",
  },
];

function TransactionRow({ tx }) {
  const { colors } = useTheme();
  const isSent = tx.type === "sent";
  const isSuccess = tx.status === "successful";

  return (
    <div
      className="flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.045)";
        e.currentTarget.style.borderColor = "rgba(193,154,107,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
      }}
    >
      {/* Direction Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: isSent ? "rgba(139,47,47,0.15)" : "rgba(74,112,67,0.15)",
          color: isSent ? "#c97070" : "#6aab63",
        }}
      >
        <i className={`fas fa-arrow-${isSent ? "up" : "down"} text-sm`} />
      </div>

      {/* Description + Date */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium truncate"
          style={{ color: colors.primaryText }}
        >
          {tx.description}
        </p>
        <p
          className="text-xs mt-0.5 truncate"
          style={{ color: colors.secondaryText }}
        >
          {tx.date}
        </p>
      </div>

      {/* Amount + Status */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span
          className="text-sm font-bold tracking-tight"
          style={{ color: isSent ? "#c97070" : colors.success }}
        >
          {isSent ? "− " : "+ "}
          {tx.amount}
        </span>
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{
            background: isSuccess
              ? "rgba(74,112,67,0.12)"
              : "rgba(139,47,47,0.12)",
            border: `1px solid ${isSuccess ? "rgba(74,112,67,0.25)" : "rgba(139,47,47,0.25)"}`,
          }}
        >
          <i
            className={`fas fa-${isSuccess ? "check" : "times"}`}
            style={{
              fontSize: "9px",
              color: isSuccess ? colors.success : colors.error,
            }}
          />
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.04em",
              color: isSuccess ? colors.success : colors.error,
            }}
          >
            {tx.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function History() {
  const { colors } = useTheme();
  return (
    <>
      <div
        className="w-full min-h-screen flex items-center justify-center px-4 py-6"
        style={{ background: colors.background }}
      >
        <div className="w-full sm:max-w-2xl flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2
                className="text-xl font-bold tracking-tight"
                style={{ color: colors.primaryText }}
              >
                Transactions
              </h2>
              <p
                className="text-xs mt-0.5"
                style={{ color: colors.secondaryText }}
              >
                Your recent activity
              </p>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs cursor-pointer"
              style={{
                background: "rgba(193,154,107,0.08)",
                border: "1px solid rgba(193,154,107,0.2)",
                color: colors.accent,
                letterSpacing: "0.08em",
              }}
            >
              <i className="fas fa-sliders-h text-xs" />
              &nbsp;Filter
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px mb-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
            }}
          />

          {/* List */}
          <div className="flex flex-col gap-2.5">
            {transactions.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
