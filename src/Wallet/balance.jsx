import { useState } from "react";
import useTheme from "../Client/Toggletheme.jsx";

import { useQuery } from "@tanstack/react-query";
import supabase from "../lib/util.jsx";

export default function Balance() {
  const { colors } = useTheme();
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const { data, isError, isPending, error, refetch } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("wallet")
        .select("*")
        .eq("userId", user.id)
        .single();

      if (error) throw new Error(error.message);

      return data;
    },
    retry: false,
  });

  const copyToClipboard = () => {
    if (!data?.virtualAccountNumber) return;
    navigator.clipboard.writeText(data.virtualAccountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleRefresh = async () => {
    setSpinning(true);
    await refetch();
    setTimeout(() => setSpinning(false), 500);
  };

  if (isPending) return <p style={{ color: colors.text }}>Loading wallet…</p>;

  if (isError) return <p style={{ color: colors.text }}>{error.message}</p>;

  return (
    <div
      className="flex items-center justify-center px-4 py-8"
      style={{ background: colors.background }}
    >
      <div className="w-full max-w-full sm:max-w-2xl flex flex-col gap-3">
        {/* CARD */}
        <div
          className="w-full rounded-3xl border overflow-hidden"
          style={{
            background: `linear-gradient(155deg, ${colors.container} 0%, #1e1e1e 70%, ${colors.background} 100%)`,
            borderColor: colors.border,
            boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
          }}
        >
          <div
            className="h-0.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})`,
            }}
          />

          <div className="p-6 flex flex-col gap-5">
            {/* NAME + REFRESH */}
            <div className="flex items-center justify-between">
              <span
                className="text-lg font-semibold tracking-wide"
                style={{ color: colors.primaryText }}
              >
                {data.fullName}
              </span>

              <button
                onClick={handleRefresh}
                className="w-9 h-9 rounded-full flex items-center justify-center border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                  color: colors.secondaryText,
                  transform: spinning ? "rotate(360deg)" : "rotate(0deg)",
                  transition: "transform 0.5s linear",
                }}
              >
                ↻
              </button>
            </div>

            {/* ACCOUNT NUMBER */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="font-mono tracking-widest"
                style={{ color: colors.text }}
              >
                {data.virtualAccountNumber}
              </span>

              <button
                onClick={copyToClipboard}
                className="px-3 py-1 rounded-lg text-xs uppercase tracking-widest"
                style={{
                  background: copied
                    ? "rgba(74,112,67,0.15)"
                    : "rgba(193,154,107,0.1)",
                  border: `1px solid ${colors.border}`,
                  color: copied ? colors.success : colors.accent,
                }}
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>

            {/* BALANCE */}
            <div>
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: colors.secondaryText }}
              >
                NGN Balance
              </span>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>
                ₦{data.walletBalance.toLocaleString()}.00
              </p>
            </div>
          </div>
        </div>

        {/* WARNING */}
        <p
          className="text-xs text-center"
          style={{ color: colors.secondaryText }}
        >
          Wallet funds can only be used on Cheddar Marketplace.
        </p>
      </div>
    </div>
  );
}
