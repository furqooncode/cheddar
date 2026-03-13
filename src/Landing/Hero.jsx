import Header from "./Header.jsx";
import colors from "../color.jsx";
import mockup from "../assets/mockup.png";
import { motion } from "framer-motion";
import bgImage from "../assets/background.jpg";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// Generate particle positions outside component to avoid impure function calls during render
const generateParticles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 6 + Math.random() * 4,
  }));
};

const particles = generateParticles(20);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

function FeatureCard({ icon, title, text, className }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.05 }}
      className={`absolute w-[100px] sm:w-[120px] h-[80px] rounded-[10px] grid gap-1 p-[6px] backdrop-blur-md border border-white/20 ${className}`}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.76)" }}
    >
      <div className="flex items-center gap-2">
        <i
          className={`fas ${icon} text-sm`}
          style={{ color: colors.deepWhite }}
        />
        <p
          className="text-sm font-medium sm:font-semibold"
          style={{ color: colors.deepWhite }}
        >
          {title}
        </p>
      </div>
      <span
        className="text-xs sm:text-sm"
        style={{ color: colors.container, fontFamily: "cursive" }}
      >
        {text}
      </span>
    </motion.div>
  );
}

export function Com() {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  return (
    <section id="home" className="min-h-screen w-full">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-14">
        {/* LEFT CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-[520px] space-y-5"
        >
          <motion.h1
            variants={item}
            className="font-bold text-3xl sm:text-5xl uppercase text-center md:text-left"
            style={{ color: colors.primaryText, fontFamily: "Orbitron" }}
          >
            Enter the Cheddar Drop!
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg font-semibold text-center md:text-left"
            style={{ color: colors.text, fontStyle: "italic" }}
          >
            …Where Rarity Meets Comfort…
          </motion.p>

          <motion.span
            variants={item}
            className="text-sm sm:text-md sm:font-semibold text-center"
            style={{ color: colors.grayText }}
          >
            Exclusively for the discerning gentleman.Limited-edition hoodies of
            superior craftsmanship, where luxury fabrics deliver refined comfort
            and understated distinction. Curated with impeccable detail for
            timeless elegance.
          </motion.span>

          <motion.div
            variants={item}
            className="flex mt-3 gap-4 pt-2 justify-center md:justify-start"
          >
            <button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="px-4 py-3 sm:px-6 rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:cursor-pointer"
              style={{
                backgroundColor: hover ? colors.accent : colors.primaryText,
                color: colors.background,
              }}
            >
              Explore Now
            </button>

            <button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="px-4 sm:px-6 py-3 rounded-xl font-semibold hover:cursor-pointer transition-all duration-300 hover:scale-90"
              style={{
                backgroundColor: hover ? colors.primaryText : colors.accent,
                color: colors.background,
              }}
              onClick={() => navigate("/Signup")}
            >
              Join Wait-List →
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="relative w-full max-w-[330px] sm:max-w-[420px] lg:max-w-[480px] h-[440px] sm:h-[480px] lg:h-[530px] mx-auto grid place-items-center"
        >
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.08,
              rotate: 0,
            }}
            className="w-[95%] h-[70%] rounded-full overflow-hidden shadow-2xl"
            style={{ backgroundColor: colors.Herocard }}
          >
            <div
              className="absolute w-[320px] h-[320px] rounded-full blur-[120px]"
              style={{
                background: "rgba(255, 179, 0, 0.28)",
              }}
            />
            <img
              src={mockup}
              alt="product"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* FLOATING FEATURE CARDS */}
          <motion.div variants={container} initial="hidden" animate="show">
            <FeatureCard
              icon="fa-hand-sparkles"
              title="Curated"
              text="Handpicked with intention"
              className="left-0 top-24"
            />
            <FeatureCard
              icon="fa-user-tie"
              title="Personal"
              text="Tailored to your style"
              className="top-6 left-1/2 -translate-x-1/2"
            />
            <FeatureCard
              icon="fa-gem"
              title="Premium"
              text="Finest fabrics & finish"
              className="left-0 bottom-32"
            />
            <FeatureCard
              icon="fa-crown"
              title="Exclusive"
              text="Limited pieces"
              className="right-0 top-24"
            />
            <FeatureCard
              icon="fa-star"
              title="Elegant"
              text="Luxury presentation"
              className="right-0 bottom-32"
            />
            <FeatureCard
              icon="fa-clock-rotate-left"
              title="Timeless"
              text="Classic meets modern"
              className="bottom-10 left-1/2 -translate-x-1/2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Animation variants for background elements
const backgroundEntry = {
  hidden: { opacity: 0, scale: 1.1 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

const overlayEntry = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5,
      ease: "easeOut",
    },
  },
};

const glowEntry = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      delay: 0.8,
      ease: "easeOut",
    },
  },
};

const particlesEntry = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 1,
    },
  },
};

const singleParticle = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 0.4, scale: 1 },
};

export default function Welcome() {
  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      {/* BACKGROUND IMAGE - With entry animation */}
      <motion.img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        variants={backgroundEntry}
        initial="hidden"
        animate="show"
      />

      {/* DARK OVERLAY - With entry animation */}
      <motion.div
        className="absolute inset-0 z-10 bg-black/80"
        variants={overlayEntry}
        initial="hidden"
        animate="show"
      />

      {/* LIGHT GLOW 1 - With entry animation */}
      <motion.div
        variants={glowEntry}
        initial="hidden"
        animate="show"
        className="absolute z-10 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,0,0.35), transparent 60%)",
          top: "10%",
          left: "20%",
        }}
      />

      {/* LIGHT GLOW 2 - With entry animation */}
      <motion.div
        variants={glowEntry}
        initial="hidden"
        animate="show"
        className="absolute z-10 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(120,80,255,0.35), transparent 60%)",
          bottom: "0%",
          right: "10%",
        }}
      />

      {/* FLOATING PARTICLES - With entry animation */}
      <motion.div
        className="absolute inset-0 z-10"
        variants={particlesEntry}
        initial="hidden"
        animate="show"
      >
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            variants={singleParticle}
            className="absolute w-[4px] h-[4px] bg-white rounded-full"
            style={{
              top: particle.top,
              left: particle.left,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* PAGE CONTENT - Above all backgrounds */}
      <div className="relative z-20">
        <Header />
        <Com />
      </div>
    </div>
  );
}
