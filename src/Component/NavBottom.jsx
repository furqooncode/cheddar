import colors from '../color.jsx';

export default function NavBottom() {
  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      style={{ width: 'min(90%, 420px)' }}
    >
      <div
        className="flex items-center justify-between px-5 py-3.5 rounded-full shadow-2xl backdrop-blur-lg border border-white/20"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          color:colors.text,
        }}
      >
        {/* Home */}
        <button className="flex flex-col items-center gap-1 p-2 transition-transform active:scale-90" aria-label="Home">
          <i className="fas fa-home text-xl"></i>
          <span className="text-xs font-medium">Home</span>
        </button>

        {/* Browse / Explore */}
        <button className="flex flex-col items-center gap-1 p-2 transition-transform active:scale-90" aria-label="Browse">
          <i className="fas fa-compass text-xl"></i> {/* or fa-layer-group */}
          <span className="text-xs font-medium">Browse</span>
        </button>

        {/* Cart – bigger & raised */}
        <button
          className="relative -mt-10 w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-xl transition-all active:scale-95 hover:scale-105"
          style={{
            background: colors.accent,
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          }}
          aria-label="Cart"
        >
          <i className="fas fa-wallet text-2xl"></i>
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500  text-xs font-bold">
            3
          </span>
          <span className="text-xs font-semibold mt-1">wallet</span>
        </button>

        {/* Orders */}
        <button className="flex flex-col items-center gap-1 p-2 transition-transform active:scale-90" aria-label="Orders">
          <i className="fas fa-receipt text-xl"></i>
          <span className="text-xs font-medium">Orders</span>
        </button>

        {/* Settings */}
        <button className="flex flex-col items-center gap-1 p-2 transition-transform active:scale-90" aria-label="Settings">
          <i className="fas fa-cog text-xl"></i>
          <span className="text-xs font-medium">Settings</span>
        </button>
      </div>
    </nav>
  );
}