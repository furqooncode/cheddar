import Header from "./Header.jsx";
import colors from "../color.jsx";
import mockup from "../assets/mockup.png";
import { motion } from "framer-motion";
import bgImage from "../assets/background.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// ── Particles generated outside component ──
const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: 5 + Math.random() * 5,
  delay: Math.random() * 4,
  size: Math.random() > 0.8 ? 3 : 2,
}));

// ── Framer variants ──
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.22, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

const cardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const cardItem = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ── Feature card ──
function FeatureCard({ icon, title, text, className }) {
  return (
    <motion.div
      variants={cardItem}
      whileHover={{ scale: 1.06, y: -3 }}
      transition={{ type: "spring", stiffness: 260 }}
      className={`absolute flex flex-col gap-1 p-3 rounded-2xl backdrop-blur-xl ${className}`}
      style={{
        width: 118,
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.15) inset",
      }}
    >
      <div className="flex items-center gap-1.5">
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(212,163,115,0.25)" }}
        >
          <i className={`fas ${icon}`} style={{ fontSize: 9, color: "#d4a373" }} />
        </div>
        <p className="text-xs font-semibold text-white leading-none truncate">
          {title}
        </p>
      </div>
      <span className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>
        {text}
      </span>
    </motion.div>
  );
}

// ── Main content section ──
export function Com() {
  const navigate = useNavigate();

  return (
    <section id="home" className="min-h-screen w-full flex items-center">
      <div className="max-w-[1200px] mx-auto w-full px-5 sm:px-8 md:px-10 lg:px-14 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16">

        {/* ── LEFT CONTENT ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 items-center md:items-start text-center md:text-left"
        >
          {/* Label pill */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(212,163,115,0.12)",
              border: "1px solid rgba(212,163,115,0.3)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#d4a373" }}
            />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#d4a373" }}>
              Limited Edition Drop
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-black text-4xl sm:text-5xl lg:text-6xl leading-none uppercase"
            style={{
              color: "#F5F5F5",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
            }}
          >
            Enter the<br />
            <span style={{ color: "#d4a373" }}>Cheddar</span><br />
            Drop.
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg font-light italic"
            style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}
          >
            Where Rarity Meets Comfort
          </motion.p>

          {/* Body */}
          <motion.p
            variants={item}
            className="text-sm sm:text-base font-light leading-relaxed max-w-md"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Exclusively for the discerning gentleman. Limited-edition hoodies of superior craftsmanship — luxury fabrics, refined comfort, and understated distinction curated for timeless elegance.
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={item}
            className="w-12 h-0.5 rounded-full"
            style={{ background: "#d4a373" }}
          />

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex items-center gap-3 flex-wrap justify-center md:justify-start"
          >
            <button
              className="px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              style={{
                background: "linear-gradient(135deg, #e8c98a 0%, #d4a373 50%, #b8864e 100%)",
                color: "#0a0a0a",
                boxShadow: "0 6px 20px rgba(212,163,115,0.35)",
                letterSpacing: "0.1em",
              }}
            >
              Explore Now
            </button>

            <button
              className="px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#F5F5F5",
                letterSpacing: "0.1em",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => navigate("/Signup")}
            >
              Join Waitlist →
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={item} className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#c97070", "#6aab63", "#d4a373", "#7090c9"].map((c, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-black/60 flex-shrink-0"
                  style={{ background: c }}
                />
              ))}
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span style={{ color: "#d4a373", fontWeight: 600 }}>2,400+</span> already on the list
            </p>
          </motion.div>
        </motion.div>

        {/* ── RIGHT IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
          style={{ width: "100%", maxWidth: 460, height: 520 }}
        >
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,163,115,0.15) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* Floating image container */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.04, rotate: 0 }}
            className="absolute inset-8 rounded-[40px] overflow-hidden"
            style={{
              background: "radial-gradient(135deg, rgba(212,163,115,0.18) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(212,163,115,0.2)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,163,115,0.1)",
            }}
          >
            {/* Inner gold glow */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 30%, rgba(212,163,115,0.25) 0%, transparent 65%)",
              }}
            />
            <img
              src={mockup}
              alt="Cheddar product"
              className="w-full h-full object-contain relative z-10"
            />
          </motion.div>

          {/* ── FLOATING FEATURE CARDS ── */}
          <motion.div variants={cardContainer} initial="hidden" animate="show">
            <FeatureCard icon="fa-hand-sparkles" title="Curated"   text="Handpicked with intention"  className="left-0 top-20" />
            <FeatureCard icon="fa-user-tie"      title="Personal"  text="Tailored to your style"     className="top-4 left-1/2 -translate-x-1/2" />
            <FeatureCard icon="fa-gem"           title="Premium"   text="Finest fabrics & finish"    className="left-0 bottom-28" />
            <FeatureCard icon="fa-crown"         title="Exclusive" text="Limited pieces only"        className="right-0 top-20" />
            <FeatureCard icon="fa-star"          title="Elegant"   text="Luxury presentation"        className="right-0 bottom-28" />
            <FeatureCard icon="fa-clock-rotate-left" title="Timeless" text="Classic meets modern"   className="bottom-6 left-1/2 -translate-x-1/2" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

// ── Background variants ──
const bgVariants = {
  hidden: { opacity: 0, scale: 1.08 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: "easeOut" } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, delay: 0.4, ease: "easeOut" } },
};

const glowVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.4, delay: 0.7, ease: "easeOut" } },
};

// ── Welcome wrapper ──
export default function Welcome() {
  return (
    <div className="relative w-full overflow-hidden min-h-screen">

      {/* Background image */}
      <motion.img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        variants={bgVariants}
        initial="hidden"
        animate="show"
      />

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(160deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.85) 100%)" }}
        variants={overlayVariants}
        initial="hidden"
        animate="show"
      />

      {/* Gold glow — top left */}
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate="show"
        className="absolute z-10 rounded-full pointer-events-none"
        style={{
          width: "clamp(300px, 50vw, 700px)",
          height: "clamp(300px, 50vw, 700px)",
          background: "radial-gradient(circle, rgba(212,163,115,0.2) 0%, transparent 65%)",
          filter: "blur(60px)",
          top: "-5%",
          left: "10%",
        }}
      />

      {/* Purple glow — bottom right */}
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate="show"
        className="absolute z-10 rounded-full pointer-events-none"
        style={{
          width: "clamp(200px, 40vw, 600px)",
          height: "clamp(200px, 40vw, 600px)",
          background: "radial-gradient(circle, rgba(120,80,255,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
          bottom: "-5%",
          right: "5%",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
            initial={{ opacity: 0 }}
            animate={{ y: [-15, 15, -15], opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20">
        <Header />
        <Com />
      </div>

    </div>
  );
}
