import { useLocation } from 'react-router-dom'
import HomeNav from './Homenav.jsx'
import PageNav from './Pagenav.jsx'
import DesktopSidebar from './Desktopside.jsx'
import useAuth from '../Client/Auth.jsx';

export default function Nav() {
  const location = useLocation()
  const isHome = location.pathname === '/chd/home' || location.pathname === '/chd/' || location.pathname === '/chd'
  const { loading } = useAuth();
  return (
    <>
      <div className="lg:hidden"
      style={{
        display: loading ? "none" : 'block',
      }}>
        {isHome ? <HomeNav /> : <PageNav />}
      </div>

      <DesktopSidebar />
    </>
  )
}