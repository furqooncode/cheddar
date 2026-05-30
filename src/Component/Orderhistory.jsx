import { useNavigate } from 'react-router-dom'
import useTheme from '../Client/Toggletheme.jsx'
import NavBottom from './NavBottom.jsx'
import { useQuery } from '@tanstack/react-query'
import supabase from '../lib/util.jsx'

const shimmerStyle = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.6s infinite',
}

function Bone({ className, style }) {
  return <div className={`rounded-xl ${className}`} style={{ ...shimmerStyle, ...style }} />
}

function ReceiptCardSkeleton({ colors }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ background: colors.container, border: `1px solid ${colors.border}` }}>
      <div className="h-0.5 w-full" style={{ background: colors.border }} />
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <Bone className="h-4 w-28" style={{ backgroundColor: colors.border }} />
            <Bone className="h-3 w-20" style={{ backgroundColor: colors.border }} />
          </div>
          <Bone className="h-6 w-20 rounded-full" style={{ backgroundColor: colors.border }} />
        </div>
        <Bone className="h-8 w-full" style={{ backgroundColor: colors.border }} />
        <div className="flex gap-2">
          {[1,2,3].map(i => <Bone key={i} className="w-10 h-10 rounded-xl" style={{ backgroundColor: colors.border }} />)}
        </div>
        <div className="h-px w-full" style={{ background: colors.border }} />
        <div className="flex flex-col gap-2">
          {[1,2].map(i => (
            <div key={i} className="flex justify-between">
              <Bone className="h-3 w-1/2" style={{ backgroundColor: colors.border }} />
              <Bone className="h-3 w-16" style={{ backgroundColor: colors.border }} />
            </div>
          ))}
        </div>
        <div className="h-px w-full" style={{ background: colors.border }} />
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <Bone className="h-2 w-16" style={{ backgroundColor: colors.border }} />
            <Bone className="h-5 w-24" style={{ backgroundColor: colors.border }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function getTotal(products) {
  return (products || []).reduce((sum, p) => {
    const price = p.price || p.amount || 0
    const discount = p.discount || 0
    const discounted = discount > 0 ? price - (price * discount / 100) : price
    return sum + discounted * (p.quantity || 1)
  }, 0)
}

function ReceiptCard({ order }) {
  const navigate = useNavigate()
  const { colors } = useTheme()
  const products = order.products || []
  const totalItems = products.reduce((acc, i) => acc + (i.quantity || 1), 0)
  const total = order.amount || getTotal(products)

  return (
    <div
      className="w-full rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      style={{ background: colors.container, border: `1px solid ${colors.border}` }}
      onClick={() => navigate(`/receipt/${order.id}`, { state: order })}
    >
      {/* Green delivered bar */}
      <div className="h-0.5 w-full" style={{ background: colors.success }} />

      <div className="p-5 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-black" style={{ color: colors.primaryText }}>#{order.orderId}</p>
            <p className="text-xs" style={{ color: colors.secondaryText }}>
              Ordered {formatDate(order.created_at)}
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{ background: 'rgba(74,112,67,0.12)', border: '1px solid rgba(74,112,67,0.25)' }}
          >
            <i className="fas fa-check-circle text-xs" style={{ color: colors.success }} />
            <span className="text-xs font-semibold" style={{ color: colors.success }}>Delivered</span>
          </div>
        </div>

        {/* Delivered info */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: 'rgba(74,112,67,0.06)', border: '1px solid rgba(74,112,67,0.15)' }}
        >
          <i className="fas fa-box-open text-xs" style={{ color: colors.success }} />
          <span className="text-xs" style={{ color: colors.success }}>
            {order.paymentMethod ? `Paid via ${order.paymentMethod}` : 'Payment confirmed'}
          </span>
        </div>

        {/* Item thumbnails */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {products.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0"
                style={{ border: `2px solid ${colors.background}`, zIndex: products.length - i }}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
            ))}
            {products.length > 3 && (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: colors.container, border: `2px solid ${colors.background}`, color: colors.secondaryText }}
              >
                +{products.length - 3}
              </div>
            )}
          </div>
          <span className="text-xs" style={{ color: colors.secondaryText }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

        {/* Receipt summary */}
        <div className="flex flex-col gap-2">
          {products.map((item, i) => {
            const price = item.price || item.amount || 0
            const discount = item.discount || 0
            const discountedPrice = discount > 0 ? price - (price * discount / 100) : price
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs truncate max-w-[60%]" style={{ color: colors.secondaryText }}>
                  {item.name} x{item.quantity || 1}
                </span>
                <span className="text-xs font-semibold" style={{ color: colors.primaryText }}>
                  ₦{(discountedPrice * (item.quantity || 1)).toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

        {/* Total */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest" style={{ color: colors.secondaryText }}>Total Paid</span>
            <p className="text-lg font-black" style={{ color: colors.primaryText
            }}>
  ₦{(order.amount).toLocaleString()}</p>
          </div>
          
          
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{ background: 'rgba(193,154,107,0.1)', border: `1px solid rgba(193,154,107,0.2)`, color: colors.accent }}
          >
            View Receipt
            <i className="fas fa-arrow-right text-xs" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default function OrderHistory() {
  const navigate = useNavigate()
  const { colors } = useTheme()

  const { data: history = [], isPending, isError, error } = useQuery({
    queryKey: ['orderHistory'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('userId', user.id)
        .eq('status', 'delivered')
        .order('created_at', { ascending: false })

      if (error) throw new Error(error.message)
      return data
    }
  })

  return (
    <div className="min-h-screen w-full" style={{ background: colors.background }}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

      {/* Header */}
      <div
        className="w-full px-4 py-5 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <div className="flex flex-col gap-0.5">
          <h1 className="text-base font-black" style={{ color: colors.primaryText }}>Order History</h1>
          <p className="text-xs" style={{ color: colors.secondaryText }}>
            {isPending ? '...' : `${history.length} completed ${history.length === 1 ? 'order' : 'orders'}`}
          </p>
        </div>
       
      </div>

      <div className="w-full max-w-full px-4 py-6 flex flex-col gap-4">

        {/* Loading */}
        {isPending && (
          <>{[1,2,3].map(i => <ReceiptCardSkeleton key={i} colors={colors} />)}</>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <i className="fas fa-exclamation-circle text-3xl" style={{ color: colors.error || '#F87171' }} />
            <p className="text-sm font-semibold" style={{ color: colors.primaryText }}>Failed to load history</p>
            <p className="text-xs text-center" style={{ color: colors.secondaryText }}>{error.message}</p>
          </div>
        )}

        {/* Empty */}
        {!isPending && !isError && history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}` }}
            >
              <i className="fas fa-clock-rotate-left text-3xl" style={{ color: colors.secondaryText }} />
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-base font-bold" style={{ color: colors.primaryText }}>No order history yet</p>
              <p className="text-xs" style={{ color: colors.secondaryText }}>Completed orders will appear here</p>
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

        {/* History list */}
        {!isPending && !isError && history.length > 0 && (
          history.map((order) => <ReceiptCard key={order.id} order={order} />)
        )}

      </div>
    </div>
  )
}
