import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import useTheme from '../Client/Toggletheme.jsx'


export default function DesktopSidebar() {
  const { colors } = useTheme();
  return (
    <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-[240px] p-4 gap-6 bg-black/80 backdrop-blur-md"
      style={{ borderRight: `1px solid ${colors.border}` }}>
      
      {/* Logo */}
      <div className="w-[150px] h-[55px]">
        <img src={logo} alt="logo" className="w-full h-full object-cover" />
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-2 flex-1">
        {[
       { label: 'Home', path: '/' },
      { label: 'Browse', path: '/Browse' },
      { label: 'Cart', path: '/Cart' },
       { label: 'Wallet', path: '/Wallet' },
        ].map(({ label, path }) => (
          <NavLink key={path} to={path}
            className={({ isActive }) =>
              `px-4 py-3 rounded-xl text-lg transition-all ${isActive ? 'bg-gray/20 font-semibold' : 'hover:bg-white/10'}`
            }
            style={{ color: colors.text }}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}