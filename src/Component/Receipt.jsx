import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import colors from '../color.jsx'

// Demo order — replace with real data from useLocation state
const demoOrder = {
  id: "CHD-00123",
  createdAt: "2026-03-15T10:42:00",
  deliveredAt: "2026-03-18T14:30:00",
  status: "Delivered",
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
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('en-NG', {
    hour: '2-digit', minute: '2-digit',
  })
}

function DashedLine() {
  return (
    <div className="w-full flex items-center gap-0">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-px"
          style={{ background: i % 2 === 0 ? colors.border : 'transparent' }}
        />
      ))}
    </div>
  )
}

export default function Receipt() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const receiptRef = useRef(null)
  const order = state || demoOrder

  const handleDownload = async () => {
    // Install html2canvas: npm install html2canvas
    // then uncomment below:
    // const html2canvas = (await import('html2canvas')).default
    // const canvas = await html2canvas(receiptRef.current, { backgroundColor: '#1A1A1A', scale: 2 })
    // const link = document.createElement('a')
    // link.download = `Cheddar-Receipt-${order.id}.png`
    // link.href = canvas.toDataURL()
    // link.click()
    alert(`Receipt ${order.id} download — wire up html2canvas`)
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-4"
      style={{ background: colors.background }}
    >
      <div className="w-full max-w-sm flex flex-col gap-6">

        {/* ── RECEIPT CARD ── */}
        <div
          ref={receiptRef}
          className="w-full flex flex-col"
          style={{
            background: `linear-gradient(160deg, #242424 0%, #1a1a1a 100%)`,
            border: `1px solid ${colors.border}`,
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          {/* Gold shimmer top */}
          <div
            className="h-1 w-full"
            style={{
              background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})`,
            }}
          />

          <div className="px-6 py-8 flex flex-col gap-6">

            {/* ── LOGO centered ── */}
            <div className="flex flex-col items-center gap-1">
              <h1
                className="text-4xl font-black tracking-[0.18em] uppercase"
                style={{
                  color: colors.accent,
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: '0.2em',
                }}
              >
                CHEDDAR
              </h1>
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: colors.secondaryText, letterSpacing: '0.25em' }}
              >
                Luxury Streetwear
              </p>
            </div>

            {/* ── SUCCESS checkmark ── */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(74,112,67,0.15)',
                  border: `2px solid rgba(74,112,67,0.4)`,
                }}
              >
                <i className="fas fa-check text-xl" style={{ color: colors.success }} />
              </div>
              <p className="text-sm font-bold" style={{ color: colors.success }}>
                Payment Successful
              </p>
              <p className="text-xs text-center" style={{ color: colors.secondaryText }}>
                Your order has been confirmed and will be processed shortly
              </p>
            </div>

            <DashedLine />

            {/* ── ORDER META ── */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Order ID</span>
                <span className="text-xs font-black tracking-wide" style={{ color: colors.primaryText }}>
                  #{order.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Date</span>
                <span className="text-xs font-semibold" style={{ color: colors.primaryText }}>
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Time</span>
                <span className="text-xs font-semibold" style={{ color: colors.primaryText }}>
                  {formatTime(order.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Status</span>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(74,112,67,0.12)',
                    border: '1px solid rgba(74,112,67,0.3)',
                  }}
                >
                  <i className="fas fa-check-circle text-xs" style={{ color: colors.success }} />
                  <span className="text-xs font-semibold" style={{ color: colors.success }}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            <DashedLine />

            {/* ── ITEMS ── */}
            <div className="flex flex-col gap-3">
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: colors.secondaryText }}
              >
                Items
              </p>
              {order.items.map((item, i) => {
                const discountedPrice = item.discount > 0
                  ? item.price - (item.price * item.discount / 100)
                  : item.price
                return (
                  <div key={i} className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <p
                        className="text-xs font-medium leading-snug"
                        style={{ color: colors.primaryText }}
                      >
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: colors.secondaryText }}>
                          {item.size} · x{item.quantity}
                        </span>
                        {item.selectedColor && (
                          <div
                            className="w-2.5 h-2.5 rounded-full border"
                            style={{
                              background: item.selectedColor,
                              borderColor: 'rgba(255,255,255,0.2)',
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <span className="text-xs font-bold" style={{ color: colors.primaryText }}>
                        ₦{(discountedPrice * item.quantity).toLocaleString()}
                      </span>
                      {item.discount > 0 && (
                        <span
                          className="text-xs line-through opacity-40"
                          style={{ color: colors.secondaryText }}
                        >
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <DashedLine />

            {/* ── PRICE BREAKDOWN ── */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Subtotal</span>
                <span className="text-xs font-semibold" style={{ color: colors.text }}>
                  ₦{order.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Shipping</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: order.shipping === 0 ? colors.success : colors.text }}
                >
                  {order.shipping === 0 ? 'Free' : `₦${order.shipping.toLocaleString()}`}
                </span>
              </div>
            </div>

            <DashedLine />

            {/* ── TOTAL ── */}
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ color: colors.secondaryText }}>
                    Total Paid
                  </p>
                  <p
                    className="text-2xl font-black mt-0.5"
                    style={{ color: colors.primaryText, letterSpacing: '-0.01em' }}
                  >
                    ₦{order.total.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest" style={{ color: colors.secondaryText }}>
                    CHD Used
                  </p>
                  <p
                    className="text-2xl font-black mt-0.5"
                    style={{ color: colors.accent, letterSpacing: '-0.01em' }}
                  >
                    {order.totalCHD}
                    <span className="text-sm font-semibold ml-1">CHD</span>
                  </p>
                </div>
              </div>
            </div>

            <DashedLine />

            {/* ── DELIVERY ADDRESS ── */}
            <div className="flex flex-col gap-2">
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: colors.secondaryText }}
              >
                Delivered To
              </p>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-bold" style={{ color: colors.primaryText }}>
                  {order.delivery.name}
                </p>
                <p className="text-xs" style={{ color: colors.secondaryText }}>
                  {order.delivery.address}
                </p>
                <p className="text-xs" style={{ color: colors.secondaryText }}>
                  {order.delivery.city}, {order.delivery.state}
                </p>
                <p className="text-xs" style={{ color: colors.secondaryText }}>
                  {order.delivery.phone}
                </p>
              </div>
            </div>

            <DashedLine />

            {/* ── FOOTER ── */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-center" style={{ color: colors.secondaryText }}>
                Thank you for shopping with Cheddar
              </p>
              <p
                className="text-xs font-semibold tracking-widest"
                style={{ color: colors.accent }}
              >
                cheddar.ng
              </p>
            </div>

          </div>

          {/* Gold shimmer bottom */}
          <div
            className="h-0.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})`,
            }}
          />
        </div>

        {/* ── DOWNLOAD BUTTON ── */}
        <button
          onClick={handleDownload}
          className="w-full py-4 rounded-2xl text-sm font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: `linear-gradient(135deg, #e8c98a 0%, ${colors.accent} 50%, #a6804e 100%)`,
            color: '#1A1A1A',
            boxShadow: '0 6px 20px rgba(193,154,107,0.3)',
            letterSpacing: '0.15em',
          }}
        >
          <i className="fas fa-download text-xs" />
          Download Receipt
        </button>

        {/* ── ACTION LINKS ── */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold tracking-wide underline underline-offset-4 transition-all hover:opacity-70"
            style={{ color: colors.secondaryText }}
          >
            Back to Home
          </button>
          <div className="w-px h-3" style={{ background: colors.border }} />
          <button
            onClick={() => navigate('/Order')}
            className="text-xs font-semibold tracking-wide underline underline-offset-4 transition-all hover:opacity-70"
            style={{ color: colors.secondaryText }}
          >
            View Orders
          </button>
        </div>

      </div>
    </div>
  )
}
