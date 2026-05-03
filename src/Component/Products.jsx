
import { useNavigate } from 'react-router-dom'
import useTheme from '../Client/Toggletheme.jsx'
import useCart from '../Client/CartStorage.jsx'

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
    isFeatured: true,
    isNewArrival: false,
    createdAt: "2026-01-15",
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
    isFeatured: false,
    isNewArrival: true,
    createdAt: "2026-02-01",
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
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2026-01-20",
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
    isFeatured: true,
    isNewArrival: false,
    createdAt: "2026-01-10",
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
    isFeatured: true,
    isNewArrival: false,
    createdAt: "2026-02-10",
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
    isFeatured: false,
    isNewArrival: true,
    createdAt: "2026-02-15",
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
    colorAvailable: ["red", "blue"],
    rating: 4.1,
    reviewCount: 33,
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2026-01-05",
  },
]

function ProductCard({ product, onAddToCart }) {
  const { colors } = useTheme()
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
      {/* ── Image ── */}
      <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }}
        />

        {/* Discount badge — top left */}
        {hasDiscount && (
          <div
            className="absolute top-3 left-3 w-11 h-11 rounded-full flex items-center justify-center text-xs font-black z-10"
            style={{
              background: colors.accent,
              color: '#1A1A1A',
              boxShadow: `0 4px 12px rgba(193,154,107,0.4)`,
            }}
          >
            -{product.discount}%
          </div>
        )}

        {/* Category badge — top right */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide z-10"
          style={{
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {product.category}
        </div>

        {/* Quick View hover overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase"
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

      {/* ── Info ── */}
      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1"
      style={{
        background:  colors.container,
      }}>

        {/* Name */}
        <h3
          className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2"
          style={{ color: colors.primaryText }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: colors.secondaryText }}
        >
          {product.description}
        </p>

        {/* Size + Colors row */}
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
              style={{
                background: product.colorAvailable[0],
                borderColor: 'rgba(255,255,255,0.2)',
              }}
            />
            {extraColors > 0 && (
              <span className="text-xs font-medium" style={{ color: colors.secondaryText }}>
                +{extraColors}
              </span>
            )}
          </div>
        </div>

        {/* Price + Cart — always at bottom */}
        <div className="flex items-end justify-between mt-auto pt-2">
          <div className="flex flex-col gap-0.5">
            <span
              className="text-sm sm:text-base font-black tracking-tight"
              style={{ color: colors.accent }}
            >
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

          {/* Add to cart — stop propagation so click doesn't navigate */}
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
              onAddToCart(product)
            }}
          >
            <i className="fas fa-shopping-cart text-sm" />
          </button>
        </div>
      </div>

    </div>
  )
}

export function Fetchedproduct() {
  const { addToCart } = useCart()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  )
}

export default function Products() {
  const { colors } = useTheme()

  return (
    <div className="p-2 w-full">

      <div
        className="w-full flex items-center gap-2 overflow-hidden px-2"
        style={{ background: colors.background }}
      >
        <h3 className="text-sm font-semibold flex-shrink-0" style={{ color: colors.text }}>
          <i className="fas fa-sliders" />
        </h3>

        <div className="flex min-w-0 items-center gap-2 overflow-x-auto scrollbar-hide">
          {["All", "Hoodie", "Trousers", "Up & Down", "Polo", "Tee"].map((label) => (
            <button
              key={label}
              className="px-4 h-7 rounded-lg outline-none text-xs font-semibold flex items-center text-white flex-shrink-0 hover:opacity-80 transition-all"
              style={{ background: colors.accent }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <Fetchedproduct />
      </div>

    </div>
  )
}
