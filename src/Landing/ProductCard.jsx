import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ProductCard({ product }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="bg-white/5 border border-white/10
      backdrop-blur-md rounded-xl p-2 text-center
      hover:border-[#d4a373] transition
      perspective-1000 h-[370px] sm:h-[400px]"
    >
      {/* Image */}
      <motion.img
        src={product.image}
        alt={product.name}
        className="w-full h-[200px] object-contain mb:3 sm:mb-5"
        whileHover={{ scale: 1.08 }}
      />

      {/* Product name */}
      <h3 className="text-base sm:text-lg font-semibold mb-2">
        {product.name}
      </h3>

      {/* Price */}
      <p className="text-[#d4a373] mb-4">{product.price}</p>

      <button
        className="px-4 py-2 sm:px-6 sm:py-2 rounded-full
        bg-[#d4a373] text-black font-semibold
        hover:scale-105 transition"
      >
        View Item
      </button>
    </motion.div>
  );
}
