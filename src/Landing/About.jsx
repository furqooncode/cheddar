
import { motion } from "framer-motion";
import colors from '../color.jsx'

export default function About(){
  
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center
      px-6 sm:px-8 lg:px-16 py-20 text-white"
      style={{ backgroundColor: colors.background }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl w-full"
      >
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide uppercase">
            About Cheddar
          </h2>

          <div className="flex justify-center mt-4">
            <div>
              <div
                className="w-24 h-[3px]"
                style={{ backgroundColor: colors.accent }}
              ></div>
              <div
                className="w-14 h-[3px] mt-1"
                style={{ backgroundColor: colors.accent }}
              ></div>
            </div>
          </div>
        </div>

        {/* Brand Description */}
        <div className="max-w-3xl mx-auto text-center text-gray-300 leading-relaxed">
          <p className="text-sm sm:text-base">
            <span className="text-[#d4a373] font-semibold">Cheddar</span> is a
            luxury streetwear label created for individuals who appreciate
            refined style and exclusivity. Inspired by modern elegance and
            premium craftsmanship, Cheddar delivers limited-edition apparel
            designed to stand apart.
          </p>

          <p className="mt-4 text-sm sm:text-base">
            Every piece is carefully crafted using high-quality materials and
            thoughtful design details. From signature hoodies to premium
            streetwear essentials, each collection is released in limited drops,
            ensuring that every item remains rare, distinctive, and timeless.
          </p>

          <p className="mt-4 text-sm sm:text-base">
            At Cheddar, fashion is more than clothing — it's identity,
            confidence, and presence. Our mission is to redefine modern luxury
            streetwear through pieces that combine comfort, craftsmanship, and
            exclusivity.
          </p>
        </div>

        <div className="text-center mb-14 mt-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase">
            Our Services
          </h2>

          <div className="flex justify-center mt-4">
            <div>
              <div
                className="w-24 h-[3px]"
                style={{ backgroundColor: colors.accent }}
              ></div>
              <div
                className="w-14 h-[3px] mt-1"
                style={{ backgroundColor: colors.accent }}
              ></div>
            </div>
          </div>
        </div>

        {/* Brand Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 text-center"
          >
            <i
              className="fa-solid fa-gem text-2xl mb-3 block"
              style={{ color: colors.accent }}
            ></i>
            <h3 className="font-semibold mb-2">Premium Craftsmanship</h3>
            <p className="text-gray-400 text-sm">
              Each piece is built with precision using carefully selected
              fabrics and superior finishing.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 text-center"
          >
            <i
              className="fa-solid fa-crown text-2xl mb-3 block"
              style={{ color: colors.accent }}
            ></i>
            <h3 className="font-semibold mb-2">Limited Drops</h3>
            <p className="text-gray-400 text-sm">
              Exclusive collections released in limited quantities to preserve
              rarity and individuality.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 text-center"
          >
            <i
              className="fa-solid fa-layer-group text-2xl mb-3 block"
              style={{ color: colors.accent }}
            ></i>
            <h3 className="font-semibold mb-2">Modern Luxury</h3>
            <p className="text-gray-400 text-sm">
              A blend of luxury aesthetics and contemporary streetwear culture.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 text-center"
          >
            <i
              className="fa-solid fa-star text-2xl mb-3 block"
              style={{ color: colors.accent }}
            ></i>
            <h3 className="font-semibold mb-2">Timeless Identity</h3>
            <p className="text-gray-400 text-sm">
              Designed to remain stylish beyond trends while expressing
              confidence and individuality.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <a
            href="#waitlist"
            className="px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
            style={{ backgroundColor: colors.accent, color: colors.background }}
          >
            Join the Cheddar Waitlist
          </a>
        </div>
      </motion.div>
    </section>
  );
};

