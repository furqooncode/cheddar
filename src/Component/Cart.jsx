
import { useState } from 'react'
import useTheme from '../Client/Toggletheme.jsx';
import NavBottom from './NavBottom.jsx';

import useCart from '../Client/CartStorage.jsx'
import { useNavigate } from 'react-router-dom'

export function CartList() {
  const { cartItems, decreaseQuantity, increaseQuantity, removeFromCart, updateItemColor } = useCart()
const { colors } = useTheme();
  return (
    <>
      {!cartItems || cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}` }}
          >
            <i className="fas fa-shopping-bag text-2xl" style={{ color: colors.secondaryText }} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: colors.primaryText }}>Your cart is empty</p>
            <p className="text-xs mt-1" style={{ color: colors.secondaryText }}>
              Add some Cheddar pieces to get started
            </p>
          </div>
        </div>
      ) : (
        cartItems.map((item) => {
          const discountedPrice = item.discount > 0
            ? item.price - (item.price * item.discount / 100)
            : item.price
          const chd = (discountedPrice / 1500).toFixed(2)

          return (
            <div
              key={item.id}
              className="w-full rounded-2xl overflow-hidden border"
              style={{
                background: `linear-gradient(145deg, ${colors.container} 0%, #222222 100%)`,
                borderColor: colors.border,
              }}
            >
              <div className="flex gap-0">

                {/* Image */}
                <div className="flex-shrink-0 w-28 sm:w-36" style={{ minHeight: '160px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    style={{ minHeight: '160px' }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">

                  <div className="flex flex-col gap-1.5">

                    {/* Name + delete */}
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold leading-tight" style={{ color: colors.primaryText }}>
                        {item.name}
                      </p>
                      <button
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          background: 'rgba(139,47,47,0.12)',
                          border: '1px solid rgba(139,47,47,0.25)',
                          color: '#c97070',
                        }}
                        aria-label="Remove item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash-alt" style={{ fontSize: '10px' }} />
                      </button>
                    </div>

                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: colors.secondaryText }}>
                      {item.description}
                    </p>

                    {/* Price + CHD */}
                    <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                      <span className="text-sm font-light tracking-tight" style={{ color: colors.text }}>
                        ₦{discountedPrice.toLocaleString()}
                      </span>
                      {item.discount > 0 && (
                        <span className="text-xs line-through opacity-50" style={{ color: colors.secondaryText }}>
                          ₦{item.price.toLocaleString()}
                        </span>
                      )}
                      <span className="text-base font-black tracking-tight" style={{ color: colors.accent }}>
                        {chd} CHD
                      </span>
                    </div>

                    {/* Color selector */}
                    {item.colorAvailable && item.colorAvailable.length > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs" style={{ color: colors.secondaryText }}>Color:</span>
                        <div className="flex items-center gap-1.5">
                          {item.colorAvailable.map((c, i) => (
                            <button
                              key={i}
                              onClick={() => updateItemColor(item.id, c)}
                              className="w-5 h-5 rounded-full transition-all duration-150"
                              style={{
                                background: c,
                                border: item.selectedColor === c
                                  ? `2px solid ${colors.accent}`
                                  : '2px solid rgba(255,255,255,0.15)',
                                transform: item.selectedColor === c ? 'scale(1.2)' : 'scale(1)',
                              }}
                              aria-label={`Select color ${c}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-3 mt-3">
                    <div
                      className="flex items-center rounded-xl overflow-hidden border"
                      style={{ borderColor: colors.border }}
                    >
                      <button
                        className="w-8 h-8 flex items-center justify-center transition-all duration-150"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          color: colors.secondaryText,
                          borderRight: `1px solid ${colors.border}`,
                        }}
                        disabled={item.quantity === 1}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <i className="fas fa-minus" style={{ fontSize: '9px' }} />
                      </button>

                      <span
                        className="w-9 text-center text-sm font-semibold"
                        style={{
                          color: colors.primaryText,
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        {item.quantity}
                      </span>

                      <button
                        className="w-8 h-8 flex items-center justify-center transition-all duration-150"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          color: colors.secondaryText,
                          borderLeft: `1px solid ${colors.border}`,
                        }}
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <i className="fas fa-plus" style={{ fontSize: '9px' }} />
                      </button>
                    </div>

                    <span className="text-xs" style={{ color: colors.secondaryText }}>qty</span>
                  </div>

                </div>
              </div>
            </div>
          )
        })
      )}
    </>
  )
}

export function Summary() {
  const { cartItems } = useCart()
  const { colors } = useTheme();
const navigate = useNavigate();
  const totalPrice = cartItems.reduce((acc, item) => {
    const discountedPrice = item.discount > 0
      ? item.price - (item.price * item.discount / 100)
      : item.price
    return acc + discountedPrice * item.quantity
  }, 0)

  const totalCHD = (totalPrice / 1500).toFixed(2)

  return (
    <div
      className="w-full rounded-2xl border mt-2"
      style={{
        background: `linear-gradient(145deg, ${colors.container} 0%, #222 100%)`,
        borderColor: colors.border,
      }}
    >
      <div
        className="h-0.5 w-full rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, ${colors.warmNeutral}, ${colors.accent}, #e8c98a, ${colors.accent}, ${colors.warmNeutral})`,
        }}
      />

      <div className="p-5 flex flex-col gap-4">
        <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: colors.secondaryText }}>
          Order Summary
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: colors.secondaryText }}>Total Price</span>
          <span className="text-lg font-light tracking-tight" style={{ color: colors.text }}>
            ₦{totalPrice.toLocaleString()}
          </span>
        </div>

        <div
          className="w-full h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }}
        />

        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: colors.secondaryText }}>Total Cheddar Coin</span>
          <span className="text-2xl font-black tracking-tight" style={{ color: colors.accent }}>
            {totalCHD}{' '}
            <span className="text-sm font-semibold">CHD</span>
          </span>
        </div>

        <button
          className="w-full py-4 rounded-xl text-sm font-black tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 mt-1"
          style={{
            background: `linear-gradient(135deg, #e8c98a 0%, ${colors.accent} 50%, #a6804e 100%)`,
            color: '#1A1A1A',
            boxShadow: '0 4px 20px rgba(193,154,107,0.3)',
            letterSpacing: '0.2em',
          }}
          onClick={()=>{
            navigate("/Checkout")
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default function Cart() {
  const { cartItems } = useCart()
const { colors } = useTheme();
  return (
    <div
      className="w-full min-h-screen px-4 py-6"
      style={{ background: colors.background }}
    >
      <div className="w-full lg:max-w-lg md:max-w-md mx-auto flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: colors.primaryText }}>
              Your Cart
            </h1>
            <p className="text-xs mt-0.5" style={{ color: colors.secondaryText }}>
              {cartItems.length} items
            </p>
          </div>

          <div
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(193,154,107,0.08)',
              border: `1px solid rgba(193,154,107,0.2)`,
            }}
          >
            <i className="fas fa-shopping-bag text-sm" style={{ color: colors.accent }} />
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-bold"
              style={{ background: colors.accent, color: '#1A1A1A', fontSize: '9px' }}
            >
              {cartItems.length}
            </span>
          </div>
        </div>

        <div
          className="w-full h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }}
        />

        {/* Cart Items */}
        <div className="flex flex-col gap-3">
          <CartList />
        </div>

        {/* Summary */}
        <Summary />
        
        
      </div>
       <NavBottom />
    </div>
  )
}