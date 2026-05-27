
import { useNavigate } from 'react-router-dom'
import useTheme from '../Client/Toggletheme.jsx'
import useCart from '../Client/CartStorage.jsx'

export default function ProductCard({ product, onAddToCart, handleMove }) {
  const navigate = useNavigate()
const { colors } = useTheme()

  const hasDiscount = product.discount > 0
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount / 100)
    : product.price
  const colorList = product.colorAvailable || []
  const extraColors = colorList.length - 1

  return (
    <div
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
      style={{
        background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`,
        border: `1px solid ${colors.border}`,
      }}
      onClick={handleMove}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />

        {hasDiscount && (
          <div
            className="absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center text-xs font-black z-10"
            style={{ background: colors.accent, color: '#1A1A1A' }}
          >
            -{product.discount}%
          </div>
        )}

        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium z-10"
          style={{
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {product.category}
        </div>

        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div
            className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              backdropFilter: 'blur(8px)',
            }}
          >
            Quick View
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1" style={{ background: colors.container }}>
        <h3 className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2" style={{ color: colors.primaryText }}>
          {product.name}
        </h3>
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: colors.secondaryText }}>
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div
            className="px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`, color: colors.secondaryText }}
          >
            {product.size}
          </div>
          <div className="flex items-center gap-1">
            {colorList[0] && (
              <div
                className="w-4 h-4 rounded-full border"
                style={{ background: colorList[0]?.hex || colorList[0], borderColor: 'rgba(255,255,255,0.2)' }}
              />
            )}
            {extraColors > 0 && (
              <span className="text-xs font-medium" style={{ color: colors.secondaryText }}>+{extraColors}</span>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between mt-auto pt-2">
          <div className="flex flex-col gap-0.5">
        
            <div className="grid gap-1 items-center">
              <span className="text-xs font-medium" style={{ color: colors.text }}>₦{discountedPrice.toLocaleString()}</span>
              {hasDiscount && (
                <span className="text-xs line-through opacity-50" style={{ color: colors.secondaryText }}>
                  ₦{product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0 hover:scale-110 active:scale-95 transition-transform duration-200"
            style={{ background: colors.accent, color: '#1A1A1A', boxShadow: `0 4px 14px rgba(193,154,107,0.35)` }}
            aria-label="Add to cart"
            onClick={(e) => { e.stopPropagation(); onAddToCart(product) }}
          >
            <i className="fas fa-shopping-cart text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}



