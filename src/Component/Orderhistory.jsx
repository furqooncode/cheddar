import { useNavigate } from 'react-router-dom'
import colors from '../color.jsx'

// Demo delivered orders
const history = [
  {
    id: "CHD-00101",
    createdAt: "2026-02-10T14:30:00",
    deliveredAt: "2026-02-13T11:00:00",
    status: "Delivered",
    items: [
      {
        id: 4,
        name: "Navy Embroidered Polo Shirt",
        image: "https://m.media-amazon.com/images/I/51a6wffhW0L.jpg_BO30,255,255,255_UF750,750_SR1910,1000,0,C_QL100_.jpg",
        price: 18000,
        discount: 0,
        quantity: 1,
        size: "L",
        selectedColor: "#1a3a6b",
      },
      {
        id: 6,
        name: "Relaxed Cargo Utility Pants",
        image: "https://m.media-amazon.com/images/I/61tiHVAEEfL.jpg_BO30,255,255,255_UF750,750_SR1910,1000,0,C_QL100_.jpg",
        price: 32000,
        discount: 0,
        quantity: 1,
        size: "M",
        selectedColor: "#4a3728",
      },
    ],
    subtotal: 50000,
    shipping: 2500,
    total: 52500,
    totalCHD: 35.00,
  },
  {
    id: "CHD-00089",
    createdAt: "2026-01-20T09:00:00",
    deliveredAt: "2026-01-23T16:00:00",
    status: "Delivered",
    items: [
      {
        id: 7,
        name: "Vintage Oversized Acid Wash Tee",
        image: "https://m.media-amazon.com/images/I/71tRcJFCmnL._AC_UY1000_.jpg",
        price: 15000,
        discount: 23,
        quantity: 3,
        size: "XXL",
        selectedColor: "#9e9e9e",
      },
    ],
    subtotal: 34650,
    shipping: 0,
    total: 34650,
    totalCHD: 23.10,
  },
]

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function ReceiptCard({ order }) {
  const totalItems = order.items.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`,
        border: `1px solid ${colors.border}`,
      }}
    >
      {/* Green delivered bar */}
      <div className="h-0.5 w-full" style={{ background: colors.success }} />

      <div className="p-5 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-black" style={{ color: colors.primaryText }}>#{order.id}</p>
            <p className="text-xs" style={{ color: colors.secondaryText }}>
              Ordered {formatDate(order.createdAt)}
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(74,112,67,0.12)',
              border: '1px solid rgba(74,112,67,0.25)',
            }}
          >
            <i className="fas fa-check-circle text-xs" style={{ color: colors.success }} />
            <span className="text-xs font-semibold" style={{ color: colors.success }}>Delivered</span>
          </div>
        </div>

        {/* Delivered date */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: 'rgba(74,112,67,0.06)', border: '1px solid rgba(74,112,67,0.15)' }}
        >
          <i className="fas fa-box-open text-xs" style={{ color: colors.success }} />
          <span className="text-xs" style={{ color: colors.success }}>
            Delivered on {formatDate(order.deliveredAt)}
          </span>
        </div>

        {/* Item thumbnails */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {order.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0"
                style={{ border: `2px solid ${colors.background}`, zIndex: order.items.length - i }}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="text-xs" style={{ color: colors.secondaryText }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

        {/* Receipt summary */}
        <div className="flex flex-col gap-2">
          {order.items.map((item, i) => {
            const discountedPrice = item.discount > 0
              ? item.price - (item.price * item.discount / 100)
              : item.price
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs truncate max-w-[60%]" style={{ color: colors.secondaryText }}>
                  {item.name} x{item.quantity}
                </span>
                <span className="text-xs font-semibold" style={{ color: colors.primaryText }}>
                  ₦{(discountedPrice * item.quantity).toLocaleString()}
                </span>
              </div>
            )
          })}
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: colors.secondaryText }}>Shipping</span>
            <span className="text-xs font-semibold" style={{ color: order.shipping === 0 ? colors.success : colors.text }}>
              {order.shipping === 0 ? 'Free' : `₦${order.shipping.toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

        {/* Total */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest" style={{ color: colors.secondaryText }}>Total Paid</span>
            <p className="text-lg font-black" style={{ color: colors.primaryText }}>
              ₦{order.total.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-widest" style={{ color: colors.secondaryText }}>CHD Used</span>
            <p className="text-xl font-black" style={{ color: colors.accent }}>
              {order.totalCHD} <span className="text-sm">CHD</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function OrderHistory() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full" style={{ background: colors.background }}>

      {/* Header */}
      <div
        className="w-full px-4 md:px-10 py-5 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm transition-all hover:gap-3"
          style={{ color: colors.secondaryText }}
        >
          <i className="fas fa-arrow-left text-xs" />
          Back
        </button>

        <div className="flex flex-col items-center gap-0.5">
          <h1 className="text-base font-black" style={{ color: colors.primaryText }}>
            Order History
          </h1>
          <p className="text-xs" style={{ color: colors.secondaryText }}>
            {history.length} completed {history.length === 1 ? 'order' : 'orders'}
          </p>
        </div>

        <div style={{ width: 40 }} />
      </div>

      <div className="w-full max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">

        {/* Empty state */}
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}` }}
            >
              <i className="fas fa-clock-rotate-left text-3xl" style={{ color: colors.secondaryText }} />
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-base font-bold" style={{ color: colors.primaryText }}>
                No order history yet
              </p>
              <p className="text-xs" style={{ color: colors.secondaryText }}>
                Completed orders will appear here as receipts
              </p>
            </div>
          </div>
        ) : (
          history.map((order) => (
            <ReceiptCard key={order.id} order={order} />
          ))
        )}

      </div>
    </div>
  )
}
