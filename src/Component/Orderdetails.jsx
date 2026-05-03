import { useLocation, useNavigate } from 'react-router-dom';
import NavBottom from './NavBottom.jsx'
import colors from '../color.jsx'

const steps = ['Placed', 'Confirmed', 'Shipped', 'Delivered']

const statusConfig = {
  Pending:    { color: '#C19A6B', bg: 'rgba(193,154,107,0.12)', border: 'rgba(193,154,107,0.25)', icon: 'fa-clock',        step: 0 },
  Confirmed:  { color: '#3d5a80', bg: 'rgba(61,90,128,0.12)',   border: 'rgba(61,90,128,0.25)',   icon: 'fa-check-circle', step: 1 },
  Shipped:    { color: '#7c6fcd', bg: 'rgba(124,111,205,0.12)', border: 'rgba(124,111,205,0.25)', icon: 'fa-shipping-fast',step: 2 },
  Delivered:  { color: '#4A7043', bg: 'rgba(74,112,67,0.12)',   border: 'rgba(74,112,67,0.25)',   icon: 'fa-box-open',     step: 3 },
  Cancelled:  { color: '#8B2F2F', bg: 'rgba(139,47,47,0.12)',   border: 'rgba(139,47,47,0.25)',   icon: 'fa-times-circle', step: -1 },
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('en-NG', {
    hour: '2-digit', minute: '2-digit',
  })
}

export default function OrderDetail() {
  const { state: order } = useLocation()
  const navigate = useNavigate()

  if (!order) {
    return (
      <div className="min-h-screen flex items-center" style={{ background: colors.background }}>
        <div className="text-center flex flex-col gap-4">
          <p className="text-sm" style={{ color: colors.secondaryText }}>Order not found.</p>
          <button
            className="px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: colors.accent, color: '#1A1A1A' }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const status = statusConfig[order.status] || statusConfig.Pending
  const activeStep = status.step

  return (
    <div className="min-h-screen w-full" style={{ background: colors.background }}>

      {/* Header */}
      <div
        className="w-full px-4 md:px-10 py-5 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
       
        <p className="text-sm font-black" style={{ color: colors.primaryText }}>
          #{order.id}
        </p>

        <button
          onClick={() => 
          navigate('/OrderHistory')}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(193,154,107,0.08)',
            border: `1px solid rgba(193,154,107,0.2)`,
          }}
        >
          <i className="fas fa-clock-rotate-left text-xs" style={{ color: colors.accent }} />
        </button>
      </div>

      <div className="w-full px-4 py-6 flex flex-col gap-5">

        {/* ── PROGRESS TIMELINE ── */}
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div
            className="h-0.5 w-full"
            style={{ background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})` }}
          />

          <div className="p-5 flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.accent }}>
              Order Status
            </p>

            {order.status === 'Cancelled' ? (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(139,47,47,0.12)', border: '1px solid rgba(139,47,47,0.25)' }}
              >
                <i className="fas fa-times-circle" style={{ color: colors.error }} />
                <p className="text-sm font-semibold" style={{ color: colors.error }}>
                  Order Cancelled
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                {steps.map((step, i) => {
                  const isDone = i <= activeStep
                  const isActive = i === activeStep
                  return (
                    <div key={i} className="flex items-center flex-1">
                      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                        {/* Circle */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            background: isDone ? colors.accent : 'rgba(255,255,255,0.06)',
                            border: `2px solid ${isDone ? colors.accent : colors.border}`,
                            boxShadow: isActive ? `0 0 12px rgba(193,154,107,0.4)` : 'none',
                          }}
                        >
                          {isDone ? (
                            <i className="fas fa-check text-xs" style={{ color: '#1A1A1A' }} />
                          ) : (
                            <span className="text-xs font-bold" style={{ color: colors.secondaryText }}>
                              {i + 1}
                            </span>
                          )}
                        </div>
                        {/* Label */}
                        <span
                          className="text-xs text-center"
                          style={{
                            color: isDone ? colors.primaryText : colors.secondaryText,
                            fontWeight: isActive ? 700 : 400,
                            fontSize: '10px',
                          }}
                        >
                          {step}
                        </span>
                      </div>

                      {/* Connector line */}
                      {i < steps.length - 1 && (
                        <div
                          className="flex-1 h-0.5 mx-1 mb-5"
                          style={{
                            background: i < activeStep ? colors.accent : colors.border,
                            transition: 'background 0.3s ease',
                          }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── ADDRESSES ── */}
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="p-5 flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.accent }}>
              Delivery Route
            </p>

            <div className="flex gap-4">
              {/* From */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(193,154,107,0.12)', border: `1px solid rgba(193,154,107,0.2)` }}
                  >
                    <i className="fas fa-store text-xs" style={{ color: colors.accent }} />
                  </div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.secondaryText }}>
                    From
                  </span>
                </div>
                <div
                  className="p-3 rounded-xl flex flex-col gap-1"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.border}` }}
                >
                  <p className="text-xs font-bold" style={{ color: colors.primaryText }}>Cheddar HQ</p>
                  <p className="text-xs" style={{ color: colors.secondaryText }}>Lagos, Nigeria</p>
                  <p className="text-xs" style={{ color: colors.secondaryText }}>support@cheddar.ng</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center pt-6">
                <i className="fas fa-arrow-right text-xs" style={{ color: colors.accent }} />
              </div>

              {/* To */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(74,112,67,0.12)', border: `1px solid rgba(74,112,67,0.2)` }}
                  >
                    <i className="fas fa-map-marker-alt text-xs" style={{ color: colors.success }} />
                  </div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.secondaryText }}>
                    To
                  </span>
                </div>
                <div
                  className="p-3 rounded-xl flex flex-col gap-1"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.border}` }}
                >
                  <p className="text-xs font-bold" style={{ color: colors.primaryText }}>{order.delivery.name}</p>
                  <p className="text-xs" style={{ color: colors.secondaryText }}>{order.delivery.address}</p>
                  <p className="text-xs" style={{ color: colors.secondaryText }}>{order.delivery.city}, {order.delivery.state}</p>
                  <p className="text-xs" style={{ color: colors.secondaryText }}>{order.delivery.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ORDERED ITEMS ── */}
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="p-5 flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.accent }}>
              Items Ordered
            </p>

            <div className="flex flex-col gap-3">
              {order.items.map((item, i) => {
                const discountedPrice = item.discount > 0
                  ? item.price - (item.price * item.discount / 100)
                  : item.price

                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                      style={{ border: `1px solid ${colors.border}` }}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <p className="text-xs font-semibold truncate" style={{ color: colors.primaryText }}>
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: colors.secondaryText }}>
                          Size: {item.size}
                        </span>
                        {item.selectedColor && (
                          <div
                            className="w-3 h-3 rounded-full border"
                            style={{ background: item.selectedColor, borderColor: 'rgba(255,255,255,0.2)' }}
                          />
                        )}
                        <span className="text-xs" style={{ color: colors.secondaryText }}>
                          x{item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <span className="text-xs font-bold" style={{ color: colors.primaryText }}>
                        ₦{(discountedPrice * item.quantity).toLocaleString()}
                      </span>
                      {item.discount > 0 && (
                        <span className="text-xs line-through opacity-40" style={{ color: colors.secondaryText }}>
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div
            className="h-0.5 w-full"
            style={{ background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})` }}
          />

          <div className="p-5 flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.accent }}>
              Order Summary
            </p>

            {/* Meta info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Order ID</span>
                <span className="text-xs font-semibold" style={{ color: colors.primaryText }}>#{order.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Date</span>
                <span className="text-xs font-semibold" style={{ color: colors.primaryText }}>
                  {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Status</span>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: status.bg, border: `1px solid ${status.border}` }}
                >
                  <i className={`fas ${status.icon} text-xs`} style={{ color: status.color }} />
                  <span className="text-xs font-semibold" style={{ color: status.color }}>{order.status}</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

            {/* Price breakdown */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.secondaryText }}>Subtotal</span>
                <span className="text-sm" style={{ color: colors.text }}>₦{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.secondaryText }}>Shipping</span>
                <span className="text-sm" style={{ color: order.shipping === 0 ? colors.success : colors.text }}>
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
                <p className="text-xl font-black" style={{ color: colors.primaryText }}>
                  ₦{order.total.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-widest" style={{ color: colors.secondaryText }}>CHD Used</span>
                <p className="text-2xl font-black" style={{ color: colors.accent }}>
                  {order.totalCHD} <span className="text-sm">CHD</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      
    <NavBottom />
    </div>
  )
}
