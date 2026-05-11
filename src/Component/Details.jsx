import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useTheme from '../Client/Toggletheme.jsx'
import useCart from '../Client/CartStorage.jsx'
import NavBottom from './NavBottom.jsx'
import supabase from '../lib/util.jsx'

function StarRating({ rating }) {
  const { colors } = useTheme();
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating)
        const half = !filled && i < rating
        return (
          <i
            key={i}
            className={`fas fa-${half ? 'star-half-alt' : 'star'} text-xs`}
            style={{ color: filled || half ? '#f59e0b' : colors.border }}
          />
        )
      })}
    </div>
  )
}

function DetailsSkeleton({ colors }) {
  const shimmerStyle = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.6s infinite',
  }
  return (
    <div className="min-h-screen w-full" style={{ background: colors.background }}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-10 lg:px-16 py-4 flex flex-col lg:flex-row gap-8">
        {/* Image skeleton */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <div className="w-full rounded-2xl" style={{ ...shimmerStyle, aspectRatio: '3/4', backgroundColor: colors.container }} />
          <div className="flex gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="flex-1 rounded-xl" style={{ ...shimmerStyle, aspectRatio: '1/1', backgroundColor: colors.container }} />
            ))}
          </div>
        </div>
        {/* Info skeleton */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="h-5 w-20 rounded-full" style={{ ...shimmerStyle, backgroundColor: colors.container }} />
          <div className="h-8 w-3/4 rounded-xl" style={{ ...shimmerStyle, backgroundColor: colors.container }} />
          <div className="h-4 w-1/3 rounded-xl" style={{ ...shimmerStyle, backgroundColor: colors.container }} />
          <div className="h-10 w-1/2 rounded-xl" style={{ ...shimmerStyle, backgroundColor: colors.container }} />
          <div className="h-px w-full" style={{ backgroundColor: colors.border }} />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-full rounded" style={{ ...shimmerStyle, backgroundColor: colors.container }} />
            <div className="h-3 w-5/6 rounded" style={{ ...shimmerStyle, backgroundColor: colors.container }} />
            <div className="h-3 w-4/6 rounded" style={{ ...shimmerStyle, backgroundColor: colors.container }} />
          </div>
          <div className="flex gap-3 mt-4">
            <div className="flex-1 h-14 rounded-2xl" style={{ ...shimmerStyle, backgroundColor: colors.container }} />
            <div className="w-14 h-14 rounded-2xl" style={{ ...shimmerStyle, backgroundColor: colors.container }} />
          </div>
        </div>
      </div>
      <NavBottom />
    </div>
  )
}

export default function Details() {
  const { state: productFromState } = useLocation()
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { colors } = useTheme()
  const [activeImage, setActiveImage] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [added, setAdded] = useState(false)

  // Fetch from Supabase only if no state (direct URL access)
  const { data: fetchedProduct, isPending } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()
      if (error) throw error
      return data
    },
    enabled: !productFromState && !!productId,
  })

  const product = productFromState || fetchedProduct

  if (isPending && !productFromState) return <DetailsSkeleton colors={colors} />

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.background }}>
        <div className="text-center flex flex-col gap-4">
          <p className="text-sm" style={{ color: colors.secondaryText }}>No product found.</p>
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

  const hasDiscount = product.discount > 0
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount / 100)
    : product.price
  const cheddarCoin = (discountedPrice / 1500).toFixed(2)

  const allImages = [
    product.image,
    ...(product.images || []).filter(img => img !== product.image).slice(0, 3),
  ]

  const currentImage = activeImage || product.image

  const handleAddToCart = () => {
    addToCart({ ...product, selectedColor })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied!')
    }
  }

  return (
    <div className="min-h-screen w-full" style={{ background: colors.background }}>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-10 lg:px-16 py-4 flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* LEFT — IMAGES */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3 lg:sticky lg:top-6 lg:self-start">
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: '3/4', background: colors.container, border: `1px solid ${colors.border}` }}
          >
            <img src={currentImage} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
            {hasDiscount && (
              <div
                className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-xs font-black"
                style={{ background: colors.accent, color: '#1A1A1A', boxShadow: '0 4px 12px rgba(193,154,107,0.4)' }}
              >
                -{product.discount}%
              </div>
            )}
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-3">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className="flex-1 rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    aspectRatio: '1/1',
                    border: `2px solid ${currentImage === img ? colors.accent : colors.border}`,
                    background: colors.container,
                    opacity: currentImage === img ? 1 : 0.6,
                  }}
                >
                  <img src={img} alt={`view-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — DETAILS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5">

          {/* Category */}
          <div
            className="self-start px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{ background: 'rgba(193,154,107,0.1)', border: `1px solid rgba(193,154,107,0.2)`, color: colors.accent }}
          >
            {product.category}
          </div>

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-black leading-tight" style={{ color: colors.primaryText, letterSpacing: '-0.01em' }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-xs" style={{ color: colors.secondaryText }}>
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-black" style={{ color: colors.primaryText }}>
                ₦{discountedPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-lg line-through opacity-50" style={{ color: colors.secondaryText }}>
                  ₦{product.price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-coins text-xs" style={{ color: colors.accent }} />
              <span className="text-base font-black" style={{ color: colors.accent }}>{cheddarCoin} CHD</span>
              <span className="text-xs" style={{ color: colors.secondaryText }}>equivalent</span>
            </div>
          </div>

          <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

          {/* Description */}
          <p className="text-sm font-light leading-relaxed" style={{ color: colors.secondaryText }}>
            {product.description}
          </p>

          {/* Size */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.secondaryText }}>Size</p>
            <div
              className="self-start px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`, color: colors.primaryText }}
            >
              {product.size}
            </div>
          </div>

          {/* Colors */}
          {product.colorAvailable && product.colorAvailable.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.secondaryText }}>Color</p>
              <div className="flex items-center gap-3">
                {product.colorAvailable.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    className="w-8 h-8 rounded-full transition-all duration-200"
                    style={{
                      background: c.hex,
                      border: selectedColor?.hex === c.hex ? `3px solid ${colors.accent}` : `2px solid rgba(255,255,255,0.15)`,
                      transform: selectedColor?.hex === c.hex ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: selectedColor?.hex === c.hex ? `0 0 0 2px ${colors.background}` : 'none',
                    }}
                    aria-label={c.name}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: `${colors.accent}15`, border: `1px solid ${colors.accent}30`, color: colors.accent }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

          {/* Add to cart + share */}
          <div className="flex gap-3">
            <button
              className="flex-1 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              style={{
                background: added ? 'rgba(74,112,67,0.3)' : `linear-gradient(135deg, #e8c98a 0%, ${colors.accent} 50%, #a6804e 100%)`,
                color: added ? colors.success : '#1A1A1A',
                boxShadow: added ? 'none' : '0 6px 20px rgba(193,154,107,0.3)',
                letterSpacing: '0.15em',
                border: added ? `1px solid rgba(74,112,67,0.4)` : 'none',
              }}
              onClick={handleAddToCart}
            >
              <i className={`fas fa-${added ? 'check' : 'shopping-bag'} text-xs`} />
              {added ? 'Added to Cart' : 'Add to Cart'}
            </button>

            {/* Share */}
            <button
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}`, color: colors.secondaryText }}
              aria-label="Share product"
              onClick={handleShare}
            >
              <i className="fas fa-share-alt text-sm" />
            </button>
          </div>

          {/* Trust row */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.05)` }}
          >
            {[
              { icon: 'fa-truck', text: 'Fast Delivery' },
              { icon: 'fa-undo', text: '7-Day Return' },
              { icon: 'fa-shield-alt', text: 'Secure Pay' },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <i className={`fas ${t.icon} text-xs`} style={{ color: colors.accent }} />
                <span className="text-xs" style={{ color: colors.secondaryText }}>{t.text}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
      <NavBottom />
    </div>
  )
}
