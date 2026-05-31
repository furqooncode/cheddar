import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import useTheme from '../Client/Toggletheme.jsx'

export default function DesktopSidebar() {
  const { colors } = useTheme();

  const links = [
    { label: 'Home', path: '/chd', icon: 'fa-home' },
    { label: 'Browse', path: '/chd/Browse', icon: 'fa-search' },
    { label: 'Cart', path: '/chd/Cart', icon: 'fa-shopping-cart' },
    { label: 'Wallet', path: '/chd/Wallet', icon: 'fa-wallet' },
    { label: 'Order', path: '/chd/Order', icon: 'fa-bag-shopping' },
    { label: 'History', path: '/chd/OrderHistory', icon: 'fa-clock-rotate-left' },
    { label: 'Settings', path: '/chd/Setting', icon: 'fa-gear' },
  ]

  return (
    <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-[240px] overflow-y-auto"
      style={{ 
        borderRight: `1px solid ${colors.border}`,
        background: colors.background,
      }}>
      
      {/* Logo */}
      <div className="w-[150px] h-[55px] p-4 flex-shrink-0">
        <img src={logo} alt="logo" className="w-full h-full object-cover" />
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-2 flex-1 px-2">
        {links.map(({ label, path, icon }) => (
          <NavLink key={path} to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'}`
            }
            style={{ color: colors.text }}>
            <i className={`fas ${icon} text-lg w-5 text-center`} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}