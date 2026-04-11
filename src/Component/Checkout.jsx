import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTheme from '../Client/Toggletheme.jsx'
import NavBottom from './NavBottom.jsx'
import useCart from '../Client/CartStorage.jsx'

const states = ['Lagos', 'Ogun State', 'Ibadan']

const steps = ['Bag', 'Details', 'Confirm']

function Label({ children }) {
  const { colors } = useTheme();
  return (
    <label
      className="text-xs font-semibold tracking-widest uppercase"
      style={{ color: colors.secondaryText }}
    >
      {children}
    </label>
  )
}

// OPay-style confirm sheet
function ConfirmOverlay({ onClose, onConfirm, total, totalCHD, chdBalance }) {
  const isMobile = window.innerWidth < 768
  const insufficient = chdBalance < totalCHD
const { colors } = useTheme();
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />

        {/* Sheet */}
        <motion.div
          className="relative w-full md:w-auto md:min-w-[400px] md:max-w-md rounded-t-3xl md:rounded-3xl overflow-hidden z-10"
          style={{
            background: `linear-gradient(160deg, ${colors.container} 0%, #1a1a1a 100%)`,
            border: `1px solid ${colors.border}`,
            boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
          }}
          initial={isMobile ? { y: '100%' } : { scale: 0.9, opacity: 0 }}
          animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
          exit={isMobile ? { y: '100%' } : { scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        >
          {/* Gold top bar */}
          <div
            className="h-1 w-full"
            style={{ background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})` }}
          />

          {/* Drag indicator mobile only */}
          <div className="flex justify-center pt-3 pb-1 md:hidden">
            <div className="w-10 h-1 rounded-full" style={{ background: colors.border }} />
          </div>

          <div className="p-6 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.accent }}>
                  Cheddar Pay
                </p>
                <p className="text-lg font-black" style={{ color: colors.primaryText }}>
                  Confirm Payment
                </p>
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${colors.border}` }}
                onClick={onClose}
              >
                <i className="fas fa-times text-xs" style={{ color: colors.secondaryText }} />
              </div>
            </div>

            {/* CHD coin */}
            <div className="flex flex-col items-center gap-2 py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(193,154,107,0.1)',
                  border: `2px solid rgba(193,154,107,0.3)`,
                }}
              >
                <i className="fas fa-coins text-2xl" style={{ color: colors.accent }} />
              </div>
              <p className="text-3xl font-black" style={{ color: colors.accent }}>
                {totalCHD.toFixed(2)} <span className="text-lg">CHD</span>
              </p>
              <p className="text-sm font-light" style={{ color: colors.secondaryText }}>
                ₦{total.toLocaleString()} equivalent
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

            {/* Balance row */}
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: colors.secondaryText }}>Wallet Balance</span>
              <span
                className="text-sm font-bold"
                style={{ color: insufficient ? colors.error : colors.success }}
              >
                {chdBalance.toFixed(2)} CHD
              </span>
            </div>

            {/* Insufficient warning */}
            {insufficient && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(139,47,47,0.12)',
                  border: '1px solid rgba(139,47,47,0.25)',
                }}
              >
                <i className="fas fa-exclamation-circle text-sm" style={{ color: colors.error }} />
                <p className="text-xs" style={{ color: colors.error }}>
                  Insufficient CHD balance. Please fund your wallet.
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                className="w-full py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: insufficient
                    ? colors.border
                    : `linear-gradient(135deg, #e8c98a 0%, ${colors.accent} 50%, #a6804e 100%)`,
                  color: '#1A1A1A',
                  boxShadow: insufficient ? 'none' : '0 6px 20px rgba(193,154,107,0.35)',
                  letterSpacing: '0.15em',
                }}
                disabled={insufficient}
                onClick={onConfirm}
              >
                {insufficient ? 'Insufficient Balance' : 'Confirm Payment'}
              </button>

              <button
                className="w-full py-3.5 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${colors.border}`,
                  color: colors.secondaryText,
                }}
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Checkout() {
  const { cartItems } = useCart()
  const { colors } = useTheme();
  const [focused, setFocused] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    coupon: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // calculate discounted price per item
  const subtotal = cartItems.reduce((acc, item) => {
    const discountedPrice = item.discount > 0
      ? item.price - (item.price * item.discount / 100)
      : item.price
    return acc + discountedPrice * item.quantity
  }, 0)

  const shipping = subtotal > 50000 ? 0 : 2500
  const discount = 0
  const total = subtotal + shipping - discount
  const totalCHD = total / 1500
  const chdBalance = 701 // replace with real wallet balance from store

  const inputStyle = (name) => ({
    background: focused === name ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
    border: `1.5px solid ${focused === name ? colors.accent : colors.border}`,
    color: colors.primaryText,
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focused === name ? `0 0 0 3px rgba(193,154,107,0.08)` : 'none',
    caretColor: colors.accent,
  })

  return (
    <div className="min-h-screen w-full px-4 py-8 md:px-10 lg:px-16" style={{ background: colors.background }}>

      {/* Progress bar */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: i <= 1 ? colors.accent : 'rgba(255,255,255,0.06)',
                    color: i <= 1 ? '#1A1A1A' : colors.secondaryText,
                    border: `1.5px solid ${i <= 1 ? colors.accent : colors.border}`,
                  }}
                >
                  {i < 1 ? <i className="fas fa-check text-xs" /> : i + 1}
                </div>
                <span
                  className="text-xs tracking-wide"
                  style={{ color: i <= 1 ? colors.accent : colors.secondaryText }}
                >
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-16 sm:w-24 h-px mb-5 mx-1"
                  style={{ background: i < 1 ? colors.accent : colors.border }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

        {/* LEFT — FORM */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">

          {/* Contact */}
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{ background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`, border: `1px solid ${colors.border}` }}
          >
            <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})` }} />
            <div className="p-5 flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.accent }}>
                Contact Information
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <Label>Full Name</Label>
                  <input
                    type="text" name="fullName" value={form.fullName}
                    placeholder="Hamzat Oladimeji"
                    onChange={handleChange}
                    onFocus={() => setFocused('fullName')} onBlur={() => setFocused(null)}
                    className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                    style={inputStyle('fullName')}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <Label>Phone Number</Label>
                  <input
                    type="tel" name="phone" value={form.phone}
                    placeholder="+234 800 000 0000"
                    onChange={handleChange}
                    onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                    className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                    style={inputStyle('phone')}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <input
                  type="email" name="email" value={form.email}
                  placeholder="you@example.com"
                  onChange={handleChange}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                  style={inputStyle('email')}
                />
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{ background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`, border: `1px solid ${colors.border}` }}
          >
            <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})` }} />
            <div className="p-5 flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.accent }}>
                Delivery Address
              </p>
              <div className="flex flex-col gap-2">
                <Label>Street Address</Label>
                <input
                  type="text" name="address" value={form.address}
                  placeholder="12 Bode Thomas Street"
                  onChange={handleChange}
                  onFocus={() => setFocused('address')} onBlur={() => setFocused(null)}
                  className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                  style={inputStyle('address')}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <Label>City</Label>
                  <input
                    type="text" name="city" value={form.city}
                    placeholder="Surulere"
                    onChange={handleChange}
                    onFocus={() => setFocused('city')} onBlur={() => setFocused(null)}
                    className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                    style={inputStyle('city')}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <Label>State</Label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    onFocus={() => setFocused('state')} onBlur={() => setFocused(null)}
                    className="w-full px-4 py-3.5 rounded-xl text-sm"
                    style={{
                      ...inputStyle('state'),
                      color: form.state ? colors.primaryText : colors.secondaryText,
                    }}
                  >
                    <option value="" disabled>Select state</option>
                    {states.map((s) => (
                      <option key={s} value={s} style={{ background: colors.container, color: colors.primaryText }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Coupon */}
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{ background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`, border: `1px solid ${colors.border}` }}
          >
            <div className="p-5 flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.accent }}>
                Promo Code
              </p>
              <div className="flex gap-3">
                <input
                  type="text" name="coupon" value={form.coupon}
                  placeholder="Enter coupon code"
                  onChange={handleChange}
                  onFocus={() => setFocused('coupon')} onBlur={() => setFocused(null)}
                  className="flex-1 px-4 py-3 rounded-xl text-sm placeholder:opacity-30"
                  style={inputStyle('coupon')}
                />
                <button
                  className="px-5 py-3 rounded-xl text-sm font-semibold tracking-wide flex-shrink-0 transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(193,154,107,0.1)',
                    border: `1px solid rgba(193,154,107,0.25)`,
                    color: colors.accent,
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="w-full lg:w-2/5 lg:sticky lg:top-8 flex flex-col gap-4">
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{ background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`, border: `1px solid ${colors.border}` }}
          >
            <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})` }} />

            <div className="p-5 flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.accent }}>
                Order Summary
              </p>

              {/* Cart items */}
              <div className="flex flex-col gap-3">
                {cartItems.length === 0 ? (
                  <p className="text-xs text-center py-4" style={{ color: colors.secondaryText }}>
                    Your cart is empty
                  </p>
                ) : (
                  cartItems.map((item) => {
                    const discountedPrice = item.discount > 0
                      ? item.price - (item.price * item.discount / 100)
                      : item.price

                    return (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate" style={{ color: colors.primaryText }}>
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-xs" style={{ color: colors.secondaryText }}>
                              Qty: {item.quantity}
                            </p>
                            {/* selected color dot */}
                            {item.selectedColor && (
                              <div
                                className="w-3 h-3 rounded-full border"
                                style={{
                                  background: item.selectedColor,
                                  borderColor: 'rgba(255,255,255,0.2)',
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <span className="text-xs font-semibold flex-shrink-0" style={{ color: colors.text }}>
                          ₦{(discountedPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Divider */}
              <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

{/* Totals */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.secondaryText }}>Subtotal</span>
                  <span className="text-sm" style={{ color: colors.text }}>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.secondaryText }}>Shipping</span>
                  <span className="text-sm" style={{ color: shipping === 0 ? colors.success : colors.text }}>
                    {shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: colors.secondaryText }}>Discount</span>
                    <span className="text-sm" style={{ color: colors.success }}>-₦{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

              {/* Total */}
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest" style={{ color: colors.secondaryText }}>Total</span>
                  <p className="text-lg font-light" style={{ color: colors.text }}>₦{total.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-widest" style={{ color: colors.secondaryText }}>CHD</span>
                  <p className="text-2xl font-black" style={{ color: colors.accent }}>
                    {totalCHD.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* CHD wallet balance */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(193,154,107,0.06)',
                  border: `1px solid rgba(193,154,107,0.15)`,
                }}
              >
                <div className="flex items-center gap-2">
                  <i className="fas fa-wallet text-xs" style={{ color: colors.accent }} />
                  <span className="text-xs" style={{ color: colors.secondaryText }}>Wallet Balance</span>
                </div>
                <span className="text-sm font-bold" style={{ color: colors.accent }}>
                  {chdBalance} CHD
                </span>
              </div>

              {/* Free shipping note */}
              {shipping > 0 && (
                <p className="text-xs text-center" style={{ color: colors.secondaryText }}>
                  Add ₦{(50000 - subtotal).toLocaleString()} more for free shipping
                </p>
              )}

              {/* Place order */}
              <button
                className="w-full py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, #e8c98a 0%, ${colors.accent} 50%, #a6804e 100%)`,
                  color: '#1A1A1A',
                  boxShadow: '0 6px 20px rgba(193,154,107,0.3)',
                  letterSpacing: '0.15em',
                }}
                onClick={() => setShowConfirm(true)}
              >
                <i className="fas fa-lock text-xs" />
                Place Order
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4">
                {[
                  { icon: 'fa-shield-alt', text: 'Secure' },
                  { icon: 'fa-coins', text: 'CHD Pay' },
                  { icon: 'fa-truck', text: 'Fast Delivery' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <i className={`fas ${b.icon} text-xs`} style={{ color: colors.secondaryText }} />
                    <span className="text-xs" style={{ color: colors.secondaryText }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM OVERLAY */}
      {showConfirm && (
        <ConfirmOverlay
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false)
            alert("remove money")
          }}
          total={total}
          totalCHD={totalCHD}
          chdBalance={chdBalance}
        />
      )}
      
       <NavBottom />

    </div>
  )
}