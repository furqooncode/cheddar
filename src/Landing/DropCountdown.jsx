import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DropCountdown() {
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

  return (
    <section
      id="countdown"
      className="min-h-screen flex items-center justify-center
      px-6 sm:px-8 lg:px-16
      bg-[#070707] text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl w-full text-center"
      >
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide">
          Welcome to <span className="text-[#d4a373]">Cheddar</span>
        </h1>

        {/* Appreciation */}
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
          Thank you for signing up. You’re now part of a private circle that
          gets early access to every Cheddar release. Our drops are limited,
          intentional, and crafted for those who value premium streetwear.
        </p>

        {/* Brand message */}
        <p className="text-gray-500 mt-6 max-w-xl mx-auto">
          This is not fast fashion. Cheddar represents luxury, scarcity, and
          statement pieces designed to stand out — without saying too much.
        </p>

        {/* Divider */}
        <div className="w-24 h-[1px] bg-white/20 mx-auto my-12" />

        {/* Countdown Label */}
        <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-6">
          First Drop Goes Live In
        </p>

        {/* Countdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <TimeBox value={timeLeft.days} label="Days" />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Minutes" />
          <TimeBox value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Footer note */}
        <p className="text-gray-500 mt-12 text-sm max-w-xl mx-auto">
          We’ll notify you before the drop goes live. Stay ready.
        </p>
      </motion.div>
    </section>
  );
}

function TimeBox({ value, label }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white/5 border border-white/10
      backdrop-blur-md rounded-2xl p-6 text-center"
    >
      <motion.div
        key={value}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-4xl font-bold text-[#d4a373]"
      >
        {value}
      </motion.div>

      <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">
        {label}
      </p>
    </motion.div>
  );
}