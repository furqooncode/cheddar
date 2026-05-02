import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
const dropDate = new Date("2026-04-01T18:00:00").getTime();
import colors from '../color.jsx'

{/*export default function DropCountdown() {
  const dropDate = new Date("2026-05-15T18:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  function calculateTime() {
    const now = new Date().getTime();
    const difference = dropDate - now;

    let time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      time.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      time.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      time.minutes = Math.floor((difference / 1000 / 60) % 60);
      time.seconds = Math.floor((difference / 1000) % 60);
    }

    return time;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
=======
function calculateTime() {
  const now = new Date().getTime();
  const difference = dropDate - now;
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
} 

*/}


// ── Large white rocket SVG pointing up ──
function RocketSVG() {
  return (
    <svg viewBox="0 0 120 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Main body */}
      <rect x="40" y="80" width="40" height="180" rx="8" fill="white" opacity="0.95" />
      {/* Nose cone */}
      <path d="M40 80 Q60 10 80 80 Z" fill="white" opacity="0.95" />
      {/* Left fin */}
      <path d="M40 210 Q15 240 12 270 Q25 255 40 245 Z" fill="white" opacity="0.88" />
      {/* Right fin */}
      <path d="M80 210 Q105 240 108 270 Q95 255 80 245 Z" fill="white" opacity="0.88" />
      {/* Left small fin */}
      <path d="M40 160 Q26 172 24 186 Q34 178 40 172 Z" fill="white" opacity="0.75" />
      {/* Right small fin */}
      <path d="M80 160 Q94 172 96 186 Q86 178 80 172 Z" fill="white" opacity="0.75" />
      {/* Window */}
      <circle cx="60" cy="110" r="12" fill="#d4a373" opacity="0.5" />
      <circle cx="60" cy="110" r="8" fill="#d4a373" opacity="0.3" />
      {/* Body detail lines */}
      <line x1="40" y1="145" x2="80" y2="145" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="40" y1="180" x2="80" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Engine nozzle */}
      <rect x="46" y="256" width="28" height="12" rx="3" fill="rgba(255,255,255,0.7)" />
      {/* Engine nozzle opening */}
      <ellipse cx="60" cy="268" rx="14" ry="5" fill="rgba(245,158,11,0.6)" />
    </svg>
  );
}

// ── Fire flame particles ──
function FlameParticle({ delay, offsetX, size, duration, color }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        bottom: 0,
        left: `calc(50% + ${offsetX}px)`,
        width: size,
        height: size * 1.8,
        background: `radial-gradient(ellipse, ${color} 0%, transparent 75%)`,
        filter: "blur(2px)",
        borderRadius: "50% 50% 30% 30%",
      }}
      animate={{
        y: [0, -(40 + Math.random() * 40)],
        opacity: [0, 1, 0.7, 0],
        scaleX: [0.6, 1.1, 0.8, 0.4],
        scaleY: [0.8, 1.3, 1, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

function RocketFire() {
  const flames = [
    // Core white-hot flames
    { delay: 0,    offsetX: 0,   size: 22, duration: 0.4, color: "#fffde7" },
    { delay: 0.05, offsetX: -6,  size: 16, duration: 0.45, color: "#fff9c4" },
    { delay: 0.1,  offsetX: 6,   size: 16, duration: 0.42, color: "#fff9c4" },
    // Orange mid flames
    { delay: 0.08, offsetX: -10, size: 14, duration: 0.55, color: "#f59e0b" },
    { delay: 0.12, offsetX: 10,  size: 14, duration: 0.52, color: "#f59e0b" },
    { delay: 0.06, offsetX: 0,   size: 18, duration: 0.5,  color: "#fbbf24" },
    // Red outer flames
    { delay: 0.15, offsetX: -14, size: 10, duration: 0.65, color: "#ea580c" },
    { delay: 0.18, offsetX: 14,  size: 10, duration: 0.62, color: "#ea580c" },
    { delay: 0.2,  offsetX: -4,  size: 12, duration: 0.6,  color: "#ef4444" },
    { delay: 0.22, offsetX: 4,   size: 12, duration: 0.58, color: "#ef4444" },
    // Dark trailing smoke
    { delay: 0.25, offsetX: -8,  size: 20, duration: 0.8,  color: "rgba(100,100,100,0.3)" },
    { delay: 0.28, offsetX: 8,   size: 20, duration: 0.78, color: "rgba(100,100,100,0.3)" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
      {flames.map((f, i) => (
        <FlameParticle key={i} {...f} />
      ))}

      {/* Static glow at engine base */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: 60,
          height: 60,
          background: "radial-gradient(ellipse, rgba(251,191,36,0.7) 0%, rgba(234,88,12,0.4) 40%, transparent 70%)",
          filter: "blur(10px)",
          borderRadius: "50%",
        }}
        animate={{
          scaleX: [1, 1.3, 0.9, 1.2, 1],
          scaleY: [1, 0.8, 1.2, 0.9, 1],
          opacity: [0.8, 1, 0.7, 1, 0.8],
        }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
    </div>
  );
}

// ── Twinkling stars ──
function Stars() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() > 0.85 ? 2.5 : Math.random() > 0.6 ? 1.5 : 1,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={{ opacity: [0.05, 0.8, 0.05] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// ── Countdown box ──
function TimeBox({ value, label }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="rounded-2xl p-5 sm:p-6 text-center"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        key={value}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="text-3xl sm:text-4xl font-bold"
        style={{ color: "#d4a373" }}
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">
        {label}
      </p>
    </motion.div>
  );
}

export default function DropCountdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
  return () => clearInterval(timer);
  }, []);

  return (
    <>
    <section
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-16 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #04040a 0%, #080c14 50%, #04040a 100%)",
        color: "white",
      }}
    >
      {/* ── Stars background ── */}
      <Stars />

      {/* ── Large rocket — background, centered ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <motion.div
          style={{ width: 220, height: 520, position: "relative", opacity: 0.18 }}
          animate={{ y: [0, -5, 0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <RocketSVG />
          <RocketFire />
        </motion.div>
      </motion.div>

      {/* ── Ambient glow behind rocket ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <motion.div
          style={{
            width: 300,
            height: 300,
            background: "radial-gradient(ellipse, rgba(212,163,115,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            borderRadius: "50%",
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* ── Content — sits on top ── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative max-w-4xl w-full text-center"
        style={{ zIndex: 10 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide"
        >
          Welcome To<span style={{ color: "#d4a373" }}>Cheddar</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed text-sm md:text-base"
        >
          Thank you for joining our waitlist. You're now part of a private circle that
          gets early access to every Cheddar release. Our drops are limited,
          intentional, and crafted for those who value premium streetwear.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="hidden text-gray-600 mt-4 max-w-xl mx-auto text-sm"
        >
          This is not fast fashion. Cheddar represents luxury, scarcity, and
          statement pieces designed to stand out — without saying too much.
        </motion.p>

        <div className="w-24 h-px mx-auto my-10" style={{ background: "rgba(255,255,255,0.1)" }} />
        
      <p className="text-sm font-normal"
      style={{
        color:colors.secondaryText,
      }}>Thanks for being part of the waitlist.We will notify you when we
      finally Lunch!!</p>
      
  <Link to="/Welcome" className="text-blue-500 text-sm font-normal"><u>continue to homepage!</u></Link>
      {/*we hide these , until its a day to lunch*/}
        <p className="hidden uppercase tracking-[0.3em] text-gray-500 text-xs mb-6">
          First Drop Goes Live In
        </p>


        <div className="hidden grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <TimeBox value={timeLeft.days} label="Days" />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Minutes" />
          <TimeBox value={timeLeft.seconds} label="Seconds" />
        </div>
      {/*All hidden ends here*/}

      </motion.div>
      
  
    </section>
    <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="absolute bottom-0 text-gray-600 mt-10 text-sm max-w-md
          mx-auto text-center"
        >
          ©2026 all right reserved
        </motion.p>
    </>
  );
}
