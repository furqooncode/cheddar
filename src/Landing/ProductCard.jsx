import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ProductCard({ product }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const hasDiscount = product.discountPercent && product.originalPrice;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
      rotateX, rotateY, transformPerspective: 1000,
      background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* ── Image area ── */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transform: "scale(1)" }}
        />

        {/* Gradient overlay — always present at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
          }}
        />

        {/* Discount badge — top left */}
        {hasDiscount && (
          <div
            className="absolute top-3 left-3 w-11 h-11 rounded-full flex items-center justify-center text-xs font-black"
            style={{
              background: "#d4a373",
              color: "#0a0a0a",
              boxShadow: "0 4px 12px rgba(212,163,115,0.4)",
            }}
          >
            -{product.discountPercent}%
          </div>
        )}

        {/* Category tag — top right */}
        {product.category && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
            }}
          >
            {product.category}
          </div>
        )}

        {/* Quick view — slides up on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          style={{
            background: "rgba(212,163,115,0.15)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(212,163,115,0.25)",
          }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase flex items-center gap-2"
            style={{ color: "#d4a373" }}
          >
            Quick View
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">

        {/* Name */}
        <p
          className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2"
          style={{ color: "#F5F5F5" }}
        >
          {product.name}
        </p>

        {/* Prices */}
        <div className="flex flex-col gap-0.5">
          {/* CHD — bold gold */}
          <span
            className="text-sm sm:text-base font-black tracking-tight"
            style={{ color: "#d4a373" }}
          >
            {product.cheddarCoin}
          </span>

          {/* NGN price row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-light"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              ₦{Number(product.price).toLocaleString()}
            </span>
            {hasDiscount && (
              <span
                className="text-xs line-through"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                ₦{Number(product.originalPrice).toLocaleString()}
              </span>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
