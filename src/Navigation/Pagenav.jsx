import { useNavigate, useLocation } from 'react-router-dom'
import colors from '../color.jsx'

function getPageTitle(pathname) {
  const titles = {
    '/cart': 'My Cart',
    '/shop': 'Shop',
    '/collections': 'Collections',
    '/about': 'About',
  }
  return titles[pathname] || 'Page'
}

export default function PageNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 flex items-center justify-between p-2 h-[60px] w-full"
      style={{ border: `1px solid ${colors.border}` }}>
      
      {/* Back button + title */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)}
          className="w-[55px] h-[55px] rounded-full bg-black/50 text-3xl"
          style={{ color: colors.text, border: `1px solid ${colors.border}` }}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <span className="text-xl font-semibold" style={{ color: colors.text }}>
          {getPageTitle(location.pathname)}
        </span>
      </div>

      {/* Right icons — same as HomeNav */}
      <div className="flex gap-2 items-center">
        <button className="w-[55px] h-[55px] rounded-full bg-black/50 text-3xl"
          style={{ color: colors.text, border: `1px solid ${colors.border}` }}>
          <i className="fas fa-bell"></i>
        </button>
        <button className="w-[55px] h-[55px] rounded-full bg-black/50 text-3xl"
          style={{ color: colors.text, border: `1px solid ${colors.border}` }}>
          <i className="fas fa-user"></i>
        </button>
      </div>
    </nav>
  )
}