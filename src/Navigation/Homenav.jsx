import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import useTheme from '../Client/Toggletheme.jsx'

import useCart from '../Client/CartStorage.jsx';

import { useNavigate } from 'react-router-dom'
export default function HomeNav() {
  const { colors } = useTheme();
  const { cartItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
 const navigate = useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
      style={{
        backgroundColor: colors.background,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 h-[60px]">
        {/* Logo */}
        <div className="flex-shrink-0 w-[150px] h-[50px]">
          <img
            src={logo}
            alt="cheddar"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right icons: Notification + Profile + Cart */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button
            className="relative w-11 h-11 rounded-full flex items-center justify-center transition-transform active:scale-95"
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
            aria-label="Notifications"
          >
            <i className="fas fa-bell text-2xl"></i>
            {/* Badge example */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold shadow-sm">
              2
            </span>
          </button>

          {/* Cart */}
          <button
            className="relative w-11 h-11 rounded-full flex items-center justify-center transition-transform active:scale-95"
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
            onClick={()=>{
              navigate("/Cart")
            }}
            aria-label="Shopping cart"
          >
            <i className="fas fa-shopping-cart text-2xl"></i>
            {/* Cart count badge */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-xs font-bold shadow-sm">
              {cartItems.length}
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
}