import colors from "../color.jsx";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* Navigation Links */
const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Popular", id: "drop" },
  { name: "Faq", id: "faq" },
  { name: "Contact", id: "contact" },
];

/* Animation Variants */

const navItems = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const navItem = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
};

const menuItem = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsMenuOpen(false); // close mobile menu
  };

  return (
    <motion.div
      className="pb-[80px]"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav
        className="fixed w-full z-50 h-[70px] flex justify-between
        items-center px-4 top-0 left-0 backdrop-blur-md
        bg-white/10 border-b border-white/10"
      >
        {/* Logo */}
        <motion.div
          className="w-[150px] h-[50px] flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1, backgroundColor: "rgb(255,255,255)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-[150px] h-[55px]">
            <img src={logo} alt="logo" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden p-2 text-white text-xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? "✕" : "☰"}
        </motion.button>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden lg:flex items-center gap-6"
          variants={navItems}
          initial="hidden"
          animate="show"
        >
          {navLinks.map((link, index) => (
            <motion.button
              key={index}
              variants={navItem}
              onClick={() => scrollToSection(link.id)}
              className="text-white text-sm hover:text-amber-400 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05, color: "#f59e0b" }}
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
            </motion.button>
          ))}

          {/* Waitlist Button */}
          <motion.button
            className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
            style={{
              backgroundColor: colors.accent,
              color: colors.background,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(193,154,107,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/Signup")}
          >
            Join Waitlist
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-[70px] left-0 w-full bg-black/80 backdrop-blur-md
              p-4 lg:hidden flex flex-col gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={index}
                  variants={menuItem}
                  onClick={() => scrollToSection(link.id)}
                  className="text-white text-sm text-left hover:text-amber-400 transition-colors"
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.button>
              ))}

              {/* Mobile Waitlist Button */}
              <motion.button
                variants={menuItem}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-left"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.text,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate("/Signup");
                  setIsMenuOpen(false);
                }}
              >
                Join Waitlist
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}
