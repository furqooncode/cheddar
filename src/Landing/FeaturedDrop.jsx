import { motion } from "framer-motion";

import hoodie from "../assets/mockup.png";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Cheddar Signature Hoodie",
    price: 85000,
    originalPrice: 110000,
    discountPercent: 23,
    cheddarCoin: "57 CHD",
    category: "Hoodie",
    image: hoodie,
  },
  {
    id: 2,
    name: "Cheddar Elite Hoodie",
    price: 98000,
    originalPrice: 130000,
    discountPercent: 25,
    cheddarCoin: "65 CHD",
    category: "Hoodie",
    image: hoodie,
  },
  {
    id: 3,
    name: "Cheddar Premium Street Hoodie",
    price: 112000,
    originalPrice: 145000,
    discountPercent: 23,
    cheddarCoin: "75 CHD",
    category: "Hoodie",
    image: hoodie,
  },
  {
    id: 4,
    name: "Cheddar Casual Street Hoodie",
    price: 145000,
    originalPrice: 190000,
    discountPercent: 24,
    cheddarCoin: "97 CHD",
    category: "Hoodie",
    image: hoodie,
  },
]

// animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const FeaturedDrop = () => {
  return (
    <motion.section
      id="drop"
      className="min-h-screen bg-[#0b0b0b] text-white
      px-2 sm:px-8 lg:px-16 py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div variants={item} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
            Featured Drop
          </h2>

          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Limited pieces from the latest Cheddar collection. Designed for
            exclusivity, crafted for timeless style.
          </p>

          <div className="flex justify-center mt-4">
            <div>
              <div className="w-20 h-[3px] bg-[#d4a373]"></div>
              <div className="w-12 h-[3px] bg-[#d4a373] mt-1"></div>
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-10"
          variants={container}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={item}
          className="flex justify-center mt-10 sm:mt-12 lg:mt-16"
        >
          <a
            href="#waitlist"
            className="px-10 py-3 rounded-full
            border border-[#d4a373] text-[#d4a373]
            hover:bg-[#d4a373] hover:text-black
            transition font-semibold"
          >
            Join The Next Drop
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedDrop;
