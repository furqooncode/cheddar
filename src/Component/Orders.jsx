import { useNavigate } from 'react-router-dom'
import colors from '../color.jsx'

// Demo orders data
const orders = [
  {
    id: "CHD-00123",
    createdAt: "2026-03-15T10:42:00",
    status: "Shipped",
    items: [
      {
        id: 1,
        name: "Oversized Black Essential Hoodie",
        image: "https://static.independent.co.uk/2025/01/15/13/MS-best-mens-hoodies-indybest.jpg",
        price: 45000,
        discount: 23,
        quantity: 2,
        size: "XL",
        selectedColor: "#000000",
      },
      {
        id: 3,
        name: "Slim Fit Chino Trousers",
        image: "https://i.ebayimg.com/images/g/CHMAAOSwoAFjCBNV/s-l1200.jpg",
        price: 28500,
        discount: 21,
        quantity: 1,
        size: "M",
        selectedColor: "#2d2d2d",
      },
    ],
    delivery: {
      name: "Hamzat Oladimeji",
      address: "12 Bode Thomas Street",
      city: "Surulere",
      state: "Lagos",
      phone: "+234 800 000 0000",
    },
    subtotal: 116500,
    shipping: 0,
    total: 116500,
    totalCHD: 77.67,
  },
  {
    id: "CHD-00118",
    createdAt: "2026-03-10T08:15:00",
    status: "Pending",
    items: [
      {
        id: 5,
        name: "Luxury Zip-Track Tracksuit Set",
        image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/7f800c31-a04a-4979-ad49-e73697212f03.__CR0,0,970,600_PT0_SX970_V1___.jpg",
        price: 65000,
        discount: 24,
        quantity: 1,
        size: "XL",
        selectedColor: "#2d2d2d",
      },
    ],
    delivery: {
      name: "Hamzat Oladimeji",
      address: "12 Bode Thomas Street",
      city: "Surulere",
      state: "Lagos",
      phone: "+234 800 000 0000",
    },
    subtotal: 65000,
    shipping: 2500,
    total: 67500,
    totalCHD: 45.00,
  },
]

const statusConfig = {
  Pending:    { color: '#C19A6B', bg: 'rgba(193,154,107,0.12)', border: 'rgba(193,154,107,0.25)', icon: 'fa-clock' },
  Confirmed:  { color: '#3d5a80', bg: 'rgba(61,90,128,0.12)',   border: 'rgba(61,90,128,0.25)',   icon: 'fa-check-circle' },
  Shipped:    { color: '#7c6fcd', bg: 'rgba(124,111,205,0.12)', border: 'rgba(124,111,205,0.25)', icon: 'fa-shipping-fast' },
  Delivered:  { color: '#4A7043', bg: 'rgba(74,112,67,0.12)',   border: 'rgba(74,112,67,0.25)',   icon: 'fa-box-open' },
  Cancelled:  { color: '#8B2F2F', bg: 'rgba(139,47,47,0.12)',   border: 'rgba(139,47,47,0.25)',   icon: 'fa-times-circle' },
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function OrderCard({ order }) {
  const navigate = useNavigate()
  const status = statusConfig[order.status] || statusConfig.Pending
  const totalItems = order.items.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <div
      className="w-full rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200"
      style={{
        background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`,
        border: `1px solid ${colors.border}`,
      }}
      onClick={() => navigate('/OrderDetail', { state: order })}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})` }}
      />

      <div className="p-4 sm:p-5 flex flex-col gap-4">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <p
              className="text-sm font-black tracking-wide"
              style={{ color: colors.primaryText }}
            >
              #{order.id}
            </p>
            <p className="text-xs" style={{ color: colors.secondaryText }}>
              {formatDate(order.createdAt)}
            </p>
          </div>

          {/* Status badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full flex-shrink-0"
            style={{
              background: status.bg,
              border: `1px solid ${status.border}`,
            }}
          >
            <i className={`fas ${status.icon} text-xs`} style={{ color: status.color }} />
            <span className="text-xs font-semibold" style={{ color: status.color }}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Item thumbnails */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {order.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                style={{
                  border: `2px solid ${colors.background}`,
                  zIndex: order.items.length - i,
                }}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
            ))}
            {order.items.length > 3 && (
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{
                  background: colors.container,
                  border: `2px solid ${colors.background}`,
                  color: colors.secondaryText,
                  zIndex: 0,
                }}
              >
                +{order.items.length - 3}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-medium" style={{ color: colors.primaryText }}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
            <p className="text-xs" style={{ color: colors.secondaryText }}>
              {order.items.length} {order.items.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

        {/* Total + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs" style={{ color: colors.secondaryText }}>Total</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black" style={{ color: colors.primaryText }}>
                ₦{order.total.toLocaleString()}
              </span>
              <span className="text-xs font-bold" style={{ color: colors.accent }}>
                {order.totalCHD} CHD
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 group-hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, #e8c98a 0%, ${colors.accent} 50%, #a6804e 100%)`,
              color: '#1A1A1A',
            }}
          >
            Track Order
            <i className="fas fa-arrow-right text-xs" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Orders() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full" style={{ background: colors.background }}>

      {/* Header */}
      <div
        className="w-full px-4 md:px-10 py-5 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <div className="flex flex-col gap-0.5">
          <h1
            className="text-xl font-black tracking-tight"
            style={{ color: colors.primaryText }}
          >
            My Orders
          </h1>
          <p className="text-xs" style={{ color: colors.secondaryText }}>
            {orders.length} active {orders.length === 1 ? 'order' : 'orders'}
          </p>
        </div>

        {/* History icon */}
        <button
          onClick={() => navigate('/order-history')}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
          style={{
            background: 'rgba(193,154,107,0.08)',
            border: `1px solid rgba(193,154,107,0.2)`,
          }}
          aria-label="Order history"
        >
          <i className="fas fa-clock-rotate-left text-sm" style={{ color: colors.accent }} />
        </button>
      </div>

      <div className="w-full max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}` }}
            >
              <i className="fas fa-box-open text-3xl" style={{ color: colors.secondaryText }} />
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-base font-bold" style={{ color: colors.primaryText }}>
                No orders placed yet
              </p>
              <p className="text-xs" style={{ color: colors.secondaryText }}>
                Your active orders will appear here once you place one
              </p>
            </div>
            <button
              className="px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, #e8c98a 0%, ${colors.accent} 50%, #a6804e 100%)`,
                color: '#1A1A1A',
                boxShadow: '0 4px 16px rgba(193,154,107,0.3)',
              }}
              onClick={() => navigate('/browse')}
            >
              Shop Now
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}

      </div>
    </div>
  )
}
