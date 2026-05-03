import { useNavigate, useLocation } from 'react-router-dom'
import useTheme from '../Client/Toggletheme.jsx'


function getPageTitle(pathname) {
  const titles = {
    '/Cart': 'My Cart',
    '/Checkout' : 'CheckOut',
    '/Browse': 'Shop',
    '/Wallet' : 'Wallet',
   '/details' : 'Product Details',
   '/Order' : 'Orders List',
   '/OrderDetail' : 'Track Order',
   '/OrderHistory' : 'Order History',
   '/Setting' : 'Settings'
  }
  return titles[pathname] || 'Page'
}

export default function PageNav() {
  const navigate = useNavigate()
  const location = useLocation()
const { colors } = useTheme();
  return (
    <nav className="fixed top-0 left-0 flex items-center justify-start p-2
    h-[60px] w-full z-1000"
      style={{ 
      border: `1px solid ${colors.border}`,
      background: colors.background,
        
      }}>
      
      {/* Back button + title */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)}
          className="w-[55px] h-[55px] rounded-full bg-transparent text-3xl"
          style={{ color: colors.text, }}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <span className="text-xl font-semibold" style={{ color: colors.text }}>
          {getPageTitle(location.pathname)}
        </span>
      </div>
    </nav>
  )
}