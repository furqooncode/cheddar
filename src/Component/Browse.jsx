
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTheme from '../Client/Toggletheme.jsx'
import useCart from '../Client/CartStorage.jsx';
import NavBottom from './NavBottom.jsx'

const products = [
  {
    id: 1,
    name: "Oversized Black Essential Hoodie",
    description: "Heavyweight cotton fleece with dropped shoulders and ribbed cuffs for ultimate street-ready comfort.",
    price: 45000,
    discount: 23,
    category: "Hoodie",
    image: "https://static.independent.co.uk/2025/01/15/13/MS-best-mens-hoodies-indybest.jpg",
    images: ["url1", "url2", "url3"],
    size: "XL",
    colorAvailable: ["#000000", "#1a3a6b", "#8B2F2F"],
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: 2,
    name: "Graphic Print All-Over Hoodie",
    description: "Bold urban print on premium cotton blend, relaxed fit with kangaroo pocket and adjustable hood.",
    price: 38000,
    discount: 0,
    category: "Hoodie",
    image: "https://modaknits.com/wp-content/uploads/2023/09/ericwen_340_The_image_showcases_a_young_man_wearing_a_stylish_a_22587368-1202-4fd9-b734-5b9df8c74282.png",
    images: ["url1", "url2"],
    size: "L",
    colorAvailable: ["#ffffff", "#2d2d2d"],
    rating: 4.2,
    reviewCount: 64,
  },
  {
    id: 3,
    name: "Slim Fit Chino Trousers",
    description: "Tailored stretch cotton chinos in neutral tones with clean lines, perfect for smart-casual versatility.",
    price: 28500,
    discount: 21,
    category: "Trousers",
    image: "https://i.ebayimg.com/images/g/CHMAAOSwoAFjCBNV/s-l1200.jpg",
    images: ["url1"],
    size: "M",
    colorAvailable: ["#c2b280", "#2d2d2d", "#3d5a80"],
    rating: 4.0,
    reviewCount: 42,
  },
  {
    id: 4,
    name: "Navy Embroidered Polo Shirt",
    description: "Breathable piqué cotton polo with subtle chest embroidery and classic three-button placket.",
    price: 18000,
    discount: 0,
    category: "Polo",
    image: "https://m.media-amazon.com/images/I/51a6wffhW0L.jpg_BO30,255,255,255_UF750,750_SR1910,1000,0,C_QL100_.jpg",
    images: ["url1", "url2"],
    size: "L",
    colorAvailable: ["#1a3a6b", "#ffffff", "#000000"],
    rating: 4.7,
    reviewCount: 95,
  },
  {
    id: 5,
    name: "Luxury Zip-Track Tracksuit Set",
    description: "Modern slim-fit tracksuit in premium cotton blend with contrast stripes, ideal for casual or active wear.",
    price: 65000,
    discount: 24,
    category: "Up & Down",
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/7f800c31-a04a-4979-ad49-e73697212f03.__CR0,0,970,600_PT0_SX970_V1___.jpg",
    images: ["url1", "url2", "url3"],
    size: "XL",
    colorAvailable: ["#2d2d2d", "#8B2F2F"],
    rating: 4.8,
    reviewCount: 210,
  },
  {
    id: 6,
    name: "Relaxed Cargo Utility Pants",
    description: "Lightweight cotton cargo pants with multiple pockets, drawstring waist, and tapered leg for everyday utility.",
    price: 32000,
    discount: 0,
    category: "Trousers",
    image: "https://m.media-amazon.com/images/I/61tiHVAEEfL.jpg_BO30,255,255,255_UF750,750_SR1910,1000,0,C_QL100_.jpg",
    images: ["url1"],
    size: "M",
    colorAvailable: ["#4a3728", "#2d2d2d", "#c2b280", "#1a3a6b"],
    rating: 4.3,
    reviewCount: 77,
  },
  {
    id: 7,
    name: "Vintage Oversized Acid Wash Tee",
    description: "Heavyweight cotton oversized tee in acid-wash finish for a timeless streetwear edge.",
    price: 15000,
    discount: 23,
    category: "Tee",
    image: "https://m.media-amazon.com/images/I/71tRcJFCmnL._AC_UY1000_.jpg",
    images: ["url1", "url2"],
    size: "XXL",
    colorAvailable: ["#9e9e9e", "#000000"],
    rating: 4.1,
    reviewCount: 33,
  },
]

const categories = ["All", "Hoodie", "Trousers", "Up & Down", "Polo", "Tee"]

function ProductCard({ product }) {
  const { colors } = useTheme()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const hasDiscount = product.discount > 0
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount / 100)
    : product.price
  const cheddarCoin = (discountedPrice / 1500).toFixed(2)
  const extraColors = product.colorAvailable.length - 1

  return (
    <div
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
      style={{
        background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`,
        border: `1px solid ${colors.border}`,
      }}
      onClick={() => navigate('/details', { state: product })}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }}
        />

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
      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
        <h3
          className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2"
          style={{ color: colors.primaryText }}
        >
          {product.name}
        </h3>

        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: colors.secondaryText }}
        >
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div
            className="px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${colors.border}`,
              color: colors.secondaryText,
            }}
          >
            {product.size}
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-4 h-4 rounded-full border"
              style={{ background: product.colorAvailable[0], borderColor: 'rgba(255,255,255,0.2)' }}
            />
            {extraColors > 0 && (
              <span className="text-xs font-medium" style={{ color: colors.secondaryText }}>
                +{extraColors}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between mt-auto pt-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm sm:text-base font-black tracking-tight" style={{ color: colors.accent }}>
              {cheddarCoin} CHD
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-medium" style={{ color: colors.text }}>
                ₦{discountedPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xs line-through opacity-50" style={{ color: colors.secondaryText }}>
                  ₦{product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0 hover:scale-110 active:scale-95 transition-transform duration-200"
            style={{
              background: colors.accent,
              color: '#1A1A1A',
              boxShadow: `0 4px 14px rgba(193,154,107,0.35)`,
            }}
            aria-label="Add to cart"
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product)
            }}
          >
            <i className="fas fa-shopping-cart text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Browse() {
  const { colors } = useTheme()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div className="min-h-screen w-full" style={{ background: colors.background }}>

      {/* Page Header */}
      <div
        className="w-full px-4 md:px-10 lg:px-16 pt-10 pb-8 flex flex-col gap-2"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase"
          style={{ color: colors.accent }}
        >
          — Shop
        </p>
        <h1
          className="text-2xl md:text-4xl font-black leading-tight"
          style={{ color: colors.primaryText, letterSpacing: '-0.01em' }}
        >
          Browse Collection
        </h1>
        <p className="text-sm font-light" style={{ color: colors.secondaryText }}>
          {products.length} pieces available
        </p>
      </div>

      <div className="w-full px-4 md:px-10 lg:px-16 py-6 flex flex-col gap-6">

        {/* Search + count */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <i
              className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
              style={{ color: searchFocused ? colors.accent : colors.secondaryText }}
            />
            <input
              type="text"
              placeholder="Search for a piece..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-10 pr-10 py-3 rounded-xl text-sm placeholder:opacity-40"
              style={{
                background: searchFocused ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${searchFocused ? colors.accent : colors.border}`,
                color: colors.primaryText,
                outline: 'none',
                transition: 'all 0.2s ease',
                boxShadow: searchFocused ? `0 0 0 3px rgba(193,154,107,0.08)` : 'none',
                caretColor: colors.accent,
              }}
            />
            {search && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => setSearch('')}
                style={{ color: colors.secondaryText }}
              >
                <i className="fas fa-times text-xs" />
              </button>
            )}
          </div>

          <div
            className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl flex-shrink-0"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${colors.border}`,
            }}
          >
            <i className="fas fa-box-open text-xs" style={{ color: colors.accent }} />
            <span className="text-xs font-medium" style={{ color: colors.secondaryText }}>
              {products.length} items
            </span>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-xs font-semibold flex-shrink-0 transition-all duration-200"
              style={{
                background: activeCategory === cat ? colors.accent : 'rgba(255,255,255,0.04)',
                color: activeCategory === cat ? '#1A1A1A' : colors.secondaryText,
                border: `1px solid ${activeCategory === cat ? colors.accent : colors.border}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
       <NavBottom />
    </div>
  )
}
