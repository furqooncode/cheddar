import { useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useTheme from '../Client/Toggletheme.jsx'
import supabase from '../lib/util.jsx'
import NavBottom from './NavBottom.jsx'

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function formatTime(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString('en-NG', {
    hour: '2-digit', minute: '2-digit',
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

function getColorHex(color) {
  if (!color) return null
  if (typeof color === 'object' && color.hex) return color.hex
  return color
}

function DashedLine({ colors }) {
  return (
    <div className="w-full flex items-center">
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="flex-1 h-px" style={{ background: i % 2 === 0 ? colors.border : 'transparent' }} />
      ))}
    </div>
  )
}

function ReceiptSkeleton({ colors }) {
  const shimmer = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.6s infinite',
  }
  return (
    <div className="w-full rounded-3xl overflow-hidden" style={{ background: '#1a1a1a', border: `1px solid ${colors.border}` }}>
      <div className="h-1 w-full" style={{ background: colors.border }} />
      <div className="px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-32 rounded-xl" style={shimmer} />
          <div className="h-3 w-24 rounded-xl" style={shimmer} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full" style={shimmer} />
          <div className="h-4 w-36 rounded-xl" style={shimmer} />
        </div>
        {[1,2,3,4].map(i => (
          <div key={i} className="flex justify-between">
            <div className="h-3 w-16 rounded-xl" style={shimmer} />
            <div className="h-3 w-24 rounded-xl" style={shimmer} />
          </div>
        ))}
        {[1,2].map(i => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <div className="h-3 w-3/4 rounded-xl" style={shimmer} />
              <div className="h-2 w-1/2 rounded-xl" style={shimmer} />
            </div>
            <div className="h-4 w-16 rounded-xl" style={shimmer} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Receipt() {
  const { state: orderFromState } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()
  const receiptRef = useRef(null)
  const { colors } = useTheme()

  // Fetch from Supabase if no state (direct URL / from order history)
  const { data: fetchedOrder, isPending } = useQuery({
    queryKey: ['receipt', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw new Error(error.message)
      return data
    },
    enabled: !orderFromState && !!id,
  })

  const order = orderFromState || fetchedOrder
  const products = order?.products || []
  const total = order?.amount || getTotal(products)

//  const handleDownload = async () => {
 //   try {
    //  const html2canvas = (await import('html2canvas')).default
      //const canvas = await html2canvas(receiptRef.current, { backgroundColor: '#1A1A1A', scale: 2 })
      //const link = document.createElement('a')
     // link.download = `Cheddar-Receipt-${order?.orderId || id}.png`
   //link.href = canvas.toDataURL()
    //  link.click()
  //  } catch {
   //   alert('Install html2canvas to enable download: npm install html2canvas')
   // }
//  }

  if (isPending && !orderFromState) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center py-10 px-4" style={{ background: colors.background }}>
        <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
        <div className="w-full max-w-sm">
          <ReceiptSkeleton colors={colors} />
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-8" style={{ background: colors.background }}>
        <i className="fas fa-receipt text-4xl" style={{ color: colors.secondaryText }} />
        <p className="text-sm" style={{ color: colors.secondaryText }}>Receipt not found</p>
        <button
          className="px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: colors.accent, color: '#1A1A1A' }}
          onClick={() => navigate(-1)}
        >Go Back</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-4" style={{ background: colors.background }}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

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
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})` }} />

          <div className="px-6 py-8 flex flex-col gap-6">

            {/* Logo */}
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-4xl font-black tracking-[0.18em] uppercase" style={{ color: colors.accent, letterSpacing: '0.2em' }}>
                CHEDDAR
              </h1>
              <p className="text-xs tracking-widest uppercase" style={{ color: colors.secondaryText, letterSpacing: '0.25em' }}>
                Luxury Streetwear
              </p>
            </div>

            {/* Success */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(74,112,67,0.15)', border: '2px solid rgba(74,112,67,0.4)' }}
              >
                <i className="fas fa-check text-xl" style={{ color: colors.success }} />
              </div>
              <p className="text-sm font-bold" style={{ color: colors.success }}>Payment Successful</p>
              <p className="text-xs text-center" style={{ color: colors.secondaryText }}>
                Your order has been confirmed and will be processed shortly
              </p>
            </div>

            <DashedLine colors={colors} />

            {/* Order Meta */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Order ID</span>
                <span className="text-xs font-black tracking-wide" style={{ color: colors.primaryText }}>#{order.orderId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Date</span>
                <span className="text-xs font-semibold" style={{ color: colors.primaryText }}>{formatDate(order.created_at)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Time</span>
                <span className="text-xs font-semibold" style={{ color: colors.primaryText }}>{formatTime(order.created_at)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Payment</span>
                <span className="text-xs font-semibold capitalize" style={{ color: colors.primaryText }}>{order.paymentMethod || 'Paystack'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.secondaryText }}>Status</span>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(74,112,67,0.12)', border: '1px solid rgba(74,112,67,0.3)' }}
                >
                  <i className="fas fa-check-circle text-xs" style={{ color: colors.success }} />
                  <span className="text-xs font-semibold capitalize" style={{ color: colors.success }}>{order.status}</span>
                </div>
              </div>
            </div>

            <DashedLine colors={colors} />

            {/* Items */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.secondaryText }}>Items</p>
              {products.map((item, i) => {
                const price = item.price || item.amount || 0
                const discount = item.discount || 0
                const discountedPrice = discount > 0 ? price - (price * discount / 100) : price
                const colorHex = getColorHex(item.color)

                return (
                  <div key={i} className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <p className="text-xs font-medium leading-snug" style={{ color: colors.primaryText }}>{item.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: colors.secondaryText }}>{item.size} · x{item.quantity || 1}</span>
                        {colorHex && (
                          <div className="w-2.5 h-2.5 rounded-full border" style={{ background: colorHex, borderColor: 'rgba(255,255,255,0.2)' }} />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <span className="text-xs font-bold" style={{ color: colors.primaryText }}>
                        ₦{(discountedPrice * (item.quantity || 1)).toLocaleString()}
                      </span>
                      {discount > 0 && (
                        <span className="text-xs line-through opacity-40" style={{ color: colors.secondaryText }}>
                          ₦{(price * (item.quantity || 1)).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <DashedLine colors={colors} />

            {/* Total */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: colors.secondaryText }}>Total Paid</p>
                <p className="text-2xl font-black mt-0.5" style={{ color: colors.primaryText, letterSpacing: '-0.01em' }}>
                  ₦{total.toLocaleString()}
                </p>
              </div>
            </div>

            <DashedLine colors={colors} />

            {/* Delivery Address */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.secondaryText }}>Delivered To</p>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-bold" style={{ color: colors.primaryText }}>{order.customername}</p>
                <p className="text-xs" style={{ color: colors.secondaryText }}>{order.address}</p>
                <p className="text-xs" style={{ color: colors.secondaryText }}>{order.city}, {order.state}</p>
                <p className="text-xs" style={{ color: colors.secondaryText }}>{order.phone}</p>
              </div>
            </div>

            <DashedLine colors={colors} />

            {/* Footer */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-center" style={{ color: colors.secondaryText }}>Thank you for shopping with Cheddar</p>
              <p className="text-xs font-semibold tracking-widest" style={{ color: colors.accent }}>cheddar.ng</p>
            </div>

          </div>

          {/* Gold shimmer bottom */}
          <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})` }} />
        </div>

        {/* Download */}
        <button
          onClick={()=> alert("download")}
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

        {/* Actions */}
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
