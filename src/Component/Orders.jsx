import { useNavigate } from 'react-router-dom'
import useTheme from '../Client/Toggletheme.jsx'
import NavBottom from './NavBottom.jsx'
import { useQuery } from "@tanstack/react-query"
import supabase from "../lib/util.jsx"

const statusConfig = {
  pending:   { color: '#C19A6B', bg: 'rgba(193,154,107,0.12)', border: 'rgba(193,154,107,0.25)', icon: 'fa-clock' },
  confirmed: { color: '#3d5a80', bg: 'rgba(61,90,128,0.12)',   border: 'rgba(61,90,128,0.25)',   icon: 'fa-check-circle' },
  shipped:   { color: '#7c6fcd', bg: 'rgba(124,111,205,0.12)', border: 'rgba(124,111,205,0.25)', icon: 'fa-shipping-fast' },
  delivered: { color: '#4A7043', bg: 'rgba(74,112,67,0.12)',   border: 'rgba(74,112,67,0.25)',   icon: 'fa-box-open' },
  cancelled: { color: '#8B2F2F', bg: 'rgba(139,47,47,0.12)',   border: 'rgba(139,47,47,0.25)',   icon: 'fa-times-circle' },
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function getTotal(products) {
  return (products || []).reduce((sum, p) => sum + (p.price || p.amount || 0) * (p.quantity || 1), 0)
}

// ── Skeleton ────────────────────────────────────────────────
function OrderCardSkeleton({ colors }) {
  const shimmer = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.6s infinite',
  }
  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ background: colors.container, border: `1px solid ${colors.border}` }}>
      <div className="h-0.5 w-full" style={{ background: colors.border }} />
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-28 rounded-lg" style={shimmer} />
            <div className="h-3 w-20 rounded-lg" style={shimmer} />
          </div>
          <div className="h-6 w-20 rounded-full" style={shimmer} />
        </div>
        <div className="flex items-center gap-3">
          {[1,2,3].map((i) => (
            <div key={i} className="w-12 h-12 rounded-xl" style={shimmer} />
          ))}
        </div>
        <div className="h-px w-full" style={{ background: colors.border }} />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="h-3 w-10 rounded" style={shimmer} />
            <div className="h-5 w-24 rounded-lg" style={shimmer} />
          </div>
          <div className="h-8 w-28 rounded-xl" style={shimmer} />
        </div>
      </div>
    </div>
  )
}

// ── Order Card ──────────────────────────────────────────────
function OrderCard({ order }) {
  const navigate = useNavigate()
  const { colors } = useTheme()
  const status = statusConfig[order.status?.toLowerCase()] || statusConfig.pending
  const products = order.products || []
  const totalItems = products.reduce((acc, i) => acc + (i.quantity || 1), 0)


  return (
    <div
      className="w-full rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200"
      style={{ background: colors.container, border: `1px solid ${colors.border}` }}
      onClick={() => navigate(`/orderdetail/${order.orderId}`, { state: order })}
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
            <p className="text-sm font-black tracking-wide" style={{ color: colors.primaryText }}>
              #{order.orderId}
            </p>
            <p className="text-xs" style={{ color: colors.secondaryText }}>
              {formatDate(order.created_at)}
            </p>
          </div>

          {/* Status badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full flex-shrink-0"
            style={{ background: status.bg, border: `1px solid ${status.border}` }}
          >
            <i className={`fas ${status.icon} text-xs`} style={{ color: status.color }} />
            <span className="text-xs font-semibold capitalize" style={{ color: status.color }}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Item thumbnails */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {products.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                style={{ border: `2px solid ${colors.background}`, zIndex: products.length - i }}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
            ))}
            {products.length > 3 && (
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{ background: colors.container, border: `2px solid ${colors.background}`, color: colors.secondaryText, zIndex: 0 }}
              >
                +{products.length - 3}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-medium" style={{ color: colors.primaryText }}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
            <p className="text-xs" style={{ color: colors.secondaryText }}>
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

        {/* Total + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs" style={{ color: colors.secondaryText }}>Total</span>
            <span className="text-base font-black" style={{ color: colors.primaryText }}>
         ₦{(order.amount).toLocaleString()}{' '}Paid
            </span>
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

// ── Main ────────────────────────────────────────────────────
export default function UserOrders() {
  const navigate = useNavigate()
  const { colors } = useTheme()

  const { data: orders = [], isPending, isError, error } = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("userId", user.id)
        .order("created_at", { ascending: false })

      if (error) throw new Error(error.message)
      return data
    }
  })

  return (
    <div className="min-h-screen w-full" style={{ background: colors.background }}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

      {/* Header */}
      <div
        className="w-full px-4 md:px-10 py-5 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-black tracking-tight" style={{ color: colors.primaryText }}>
            My Orders
          </h1>
          <p className="text-xs" style={{ color: colors.secondaryText }}>
            {isPending ? '...' : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'}`}
          </p>
        </div>

        <button
          onClick={() => navigate('/OrderHistory')}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
          style={{ background: 'rgba(193,154,107,0.08)', border: `1px solid rgba(193,154,107,0.2)` }}
          aria-label="Order history"
        >
          <i className="fas fa-clock-rotate-left text-sm" style={{ color: colors.accent }} />
        </button>
      </div>

      <div className="w-full px-4 py-6 flex flex-col gap-4">

        {/* Loading */}
        {isPending && (
          <>
            {[1,2,3].map((i) => <OrderCardSkeleton key={i} colors={colors} />)}
          </>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <i className="fas fa-exclamation-circle text-3xl" style={{ color: colors.error }} />
            <p className="text-sm font-semibold" style={{ color: colors.primaryText }}>Something went wrong</p>
            <p className="text-xs text-center" style={{ color: colors.secondaryText }}>{error.message}</p>
          </div>
        )}

        {/* Empty */}
        {!isPending && !isError && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}` }}
            >
              <i className="fas fa-box-open text-3xl" style={{ color: colors.secondaryText }} />
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-base font-bold" style={{ color: colors.primaryText }}>No orders placed yet</p>
              <p className="text-xs" style={{ color: colors.secondaryText }}>
                Your orders will appear here once you place one
              </p>
            </div>
            <button
              className="px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, #e8c98a 0%, ${colors.accent} 50%, #a6804e 100%)`,
                color: '#1A1A1A',
                boxShadow: '0 4px 16px rgba(193,154,107,0.3)',
              }}
              onClick={() => navigate('/Browse')}
            >
              Shop Now
            </button>
          </div>
        )}

        {/* Orders list */}
        {!isPending && !isError && orders.length > 0 && (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}

      </div>
  
    </div>
  )
}
