import { useState } from "react";
import useTheme from "../Client/Toggletheme.jsx";

// Replace with real user data from your auth/context
const mockUser = {
  username: "furqncode",
  userId: "USR-00142",
  totalSpent: 187000,
  cashback: 2340,
};

export default function Spend({ user = mockUser }) {
  const { colors } = useTheme();
  const [copied, setCopied] = useState(false);

  const copyUserId = () => {
    navigator.clipboard.writeText(user.userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="flex items-center justify-center px-4 pt-8"
      style={{ background: colors.background }}
    >
      <div className="w-full max-w-full sm:max-w-2xl flex flex-col gap-3">

        {/* Header */}
        <div className="px-1 pb-2 border-b" style={{ borderColor: colors.border }}>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: colors.primaryText }}>
            My Account
          </h1>
          <p className="text-sm mt-0.5" style={{ color: colors.secondaryText }}>
            Your profile & spending summary
          </p>
        </div>

        {/* CARD */}
        <div
          className="w-full rounded-3xl border overflow-hidden"
          style={{
            background: colors.container,
            borderColor: colors.border,
          }}
        >
          {/* Top accent line */}
          <div
            className="h-0.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})`,
            }}
          />

          <div className="p-6 flex flex-col gap-6">
            {/* Username */}
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: colors.secondaryText }}
                >
                  Username
                </p>
                <span
                  className="text-lg font-semibold tracking-wide"
                  style={{ color: colors.primaryText }}
                >
                  @{user.username}
                </span>
              </div>

              {/* Cheddar logo mark */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: colors.accent + "22", color: colors.accent }}
              >
                C
              </div>
            </div>

            {/* User ID */}
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: colors.secondaryText }}
              >
                User ID
              </p>
              <div className="flex items-center gap-3">
                <span
                  className="font-mono tracking-widest text-sm"
                  style={{ color: colors.text }}
                >
                  {user.userId}
                </span>
                <button
                  onClick={copyUserId}
                  className="px-3 py-1 rounded-lg text-xs uppercase tracking-widest transition-colors"
                  style={{
                    background: copied ? "rgba(74,112,67,0.15)" : "rgba(193,154,107,0.1)",
                    border: `1px solid ${colors.border}`,
                    color: copied ? colors.success : colors.accent,
                  }}
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Total Spent */}
              <div
                className="rounded-2xl p-4 border"
                style={{ backgroundColor: colors.accent + "0D", borderColor: colors.border }}
              >
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: colors.secondaryText }}
                >
                  Total Spent
                </p>
                <p className="text-xl font-bold" style={{ color: colors.primaryText }}>
                  ₦{user.totalSpent.toLocaleString()}
                </p>
              </div>

              {/* Cheddar Cashback */}
              <div
                className="rounded-2xl p-4 border"
                style={{ backgroundColor: colors.warmNeutral + "33", borderColor: colors.border }}
              >
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: colors.secondaryText }}
                >
                  Cheddar Cash
                </p>
                <p className="text-xl font-bold" style={{ color: colors.accent }}>
                  {user.cashback.toLocaleString()} <span className="text-sm font-normal">pts</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
