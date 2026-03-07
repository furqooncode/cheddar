import { useLocation } from 'react-router-dom'
import HomeNav from './Homenav.jsx'
import PageNav from './Pagenav.jsx'
import DesktopSidebar from './Desktopside.jsx'

export default function Nav() {
  const location = useLocation()
  const isHome = location.pathname === '/Home'

  return (
    <>
      <div className="lg:hidden">
        {isHome ? <HomeNav /> : <PageNav />}
      </div>

      <DesktopSidebar />
    </>
  )
}