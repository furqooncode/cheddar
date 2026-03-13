import { useState } from 'react';
import colors from '../color.jsx';
import { useQuery } from '@tanstack/react-query';
import supabase from '../lib/util.jsx'


export default function Balance() {
  const {data, isError, isPending, error} = useQuery({
    queryKey:['wallet'],
    queryFn: async()=>{
      const res = await supabase.from("wallet");
      return res;
    }
  });
  
  const account = {
    name: "Hamzat Oladimeji",
    number: "0123456789",
    bank: "Sterlin Bank",
    balance: "₦45,000.00",
    cheddarCoin: "701",
  };

  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(account.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleRefresh = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
  };

  return (
    <div
      className="flex items-center justify-center px-4 py-8"
      style={{ background: colors.background }}
    >
      <div className="w-full max-w-sm sm:max-w-2xl flex flex-col gap-3">

        {/* ── CARD ── */}
        <div
          className="w-full rounded-3xl border overflow-hidden"
          style={{
            background: `linear-gradient(155deg, ${colors.container} 0%, #1e1e1e 70%, ${colors.background} 100%)`,
            borderColor: colors.border,
            boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
          }}
        >
          {/* Shimmer top bar */}
          <div
            className="h-0.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})`,
            }}
          />

          <div className="p-6 flex flex-col gap-5">

            {/* Name + Refresh */}
            <div className="flex items-center justify-between">
              <span
                className="text-lg font-semibold tracking-wide"
                style={{ color: colors.primaryText }}
              >
                {account.name}
              </span>
              <button
                onClick={handleRefresh}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                  color: colors.secondaryText,
                  fontSize: 18,
                  transform: spinning ? "rotate(360deg)" : "rotate(0deg)",
                  transition: spinning ? "transform 0.55s linear" : "transform 0.2s ease",
                }}
                aria-label="Refresh"
              >
                ↻
              </button>
            </div>

            {/* Account Number + Copy */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-base tracking-widest font-mono"
                style={{ color: colors.text }}
              >
                {account.number}
              </span>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 rounded-lg text-xs tracking-widest uppercase font-mono transition-all duration-200"
                style={{
                  background: copied ? "rgba(74,112,67,0.15)" : "rgba(193,154,107,0.1)",
                  border: `1px solid ${copied ? "rgba(74,112,67,0.4)" : "rgba(193,154,107,0.25)"}`,
                  color: copied ? colors.success : colors.accent,
                }}
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>

            {/* Bank Pill */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: colors.accent }}
              />
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: colors.secondaryText }}
              >
                {account.bank}
              </span>
            </div>

            {/* Divider */}
            <div
              className="w-full h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }}
            />

            {/* Balances */}
            <div className="flex items-stretch">
              {/* NGN */}
              <div className="flex-1 flex flex-col gap-1">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: colors.secondaryText }}
                >
                  NGN Balance
                </span>
                <span
                  className="text-2xl font-bold leading-tight"
                  style={{ color: colors.text }}
                >
                  {account.balance}
                </span>
              </div>

              {/* Vertical sep */}
              <div
                className="w-px mx-4 self-stretch"
                style={{ background: `linear-gradient(180deg, transparent, ${colors.border}, transparent)` }}
              />

              {/* CHD */}
              <div className="flex-1 flex flex-col gap-1 items-end text-right">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: colors.secondaryText }}
                >
                  Cheddar Coin
                </span>
                <span
                  className="text-2xl font-bold leading-tight"
                  style={{ color: colors.accent }}
                >
                  {account.cheddarCoin}
                </span>
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: colors.secondaryText }}
                >
                  CHD
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ── WARNING ── */}
        <div
          className="flex items-start gap-2.5 px-4 py-3 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs"
            style={{ border: `1px solid ${colors.secondaryText}`, color: colors.secondaryText }}
          >
            i
          </div>
          <p className="text-xs leading-relaxed" style={{ color: colors.secondaryText }}>
            You can only use this wallet to purchase items on Cheddar Marketplace.
          </p>
        </div>

        {/* ── FUND WALLET BUTTON ── */}
        <button
          className="w-full py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: `linear-gradient(135deg, #e8c98a 0%, ${colors.accent} 50%, #a6804e 100%)`,
            color: "#1A1A1A",
            boxShadow: "0 4px 20px rgba(193,154,107,0.3)",
            letterSpacing: "0.2em",
          }}
        >
          + Fund Wallet
        </button>

      </div>
    </div>
  );
}
