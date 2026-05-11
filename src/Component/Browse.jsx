import { useQuery } from "@tanstack/react-query";
import supabase from "../lib/util.jsx";
import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useTheme from '../Client/Toggletheme.jsx'
import useCart from '../Client/CartStorage.jsx';
import NavBottom from './NavBottom.jsx'
import BrowseSkeleton from '../Skeleton/BrowseSkeleton.jsx'

const ITEMS_PER_PAGE = 20

function ProductCard({ product }) {
  const { colors } = useTheme()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const hasDiscount = product.discount > 0
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount / 100)
    : product.price
  const cheddarCoin = (discountedPrice / 1500).toFixed(2)
  const colorList = product.colorAvailable || []
  const extraColors = colorList.length - 1

  return (
    <div
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
      style={{
        background: `linear-gradient(145deg, ${colors.container} 0%, #1e1e1e 100%)`,
        border: `1px solid ${colors.border}`,
      }}
      onClick={() => navigate(`/productdetails/${product.id}`, { state: product })}
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
            <span className="text-sm sm:text-base font-black tracking-tight" style={{ color: colors.accent }}>
              {cheddarCoin} CHD
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
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
            onClick={(e) => { e.stopPropagation(); addToCart(product) }}
          >
            <i className="fas fa-shopping-cart text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Mini skeleton for pagination loading
function MiniSkeleton({ colors }) {
  return (
    <>
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.container }}
        >
          <div
            className="w-full"
            style={{
              aspectRatio: '3/4',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.6s infinite',
            }}
          />
          <div className="p-3 flex flex-col gap-2" style={{ backgroundColor: colors.container }}>
            <div className="h-3 w-4/5 rounded-xl" style={{ background: colors.border }} />
            <div className="h-3 w-3/5 rounded-xl" style={{ background: colors.border }} />
          </div>
        </div>
      ))}
    </>
  )
}

export default function Browse() {
  const { colors } = useTheme()
  const location = useLocation()
  const cameFromHome = location.state?.from === 'home'

  const [search, setSearch] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [loadingMore, setLoadingMore] = useState(false)

  const { data: products, isPending, isError, error } = useQuery({
    queryKey: ['Userproducts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*')
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  })

  // Show skeleton only on direct navigation, not from home
  if (isPending && !cameFromHome) return <BrowseSkeleton />
  if (isError) return <p className="text-white p-8">{error.message}</p>

  // Build filters from categories + tags
  const filters = [
    "All",
    ...new Set([
      ...products.map((p) => p.category),
      ...products.flatMap((p) => p.tags || []),
    ]),
  ]

  // Filter + search logic — client side
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return products
    return products.filter((p) => {
      const inName = p.name?.toLowerCase().includes(term)
      const inCategory = p.category?.toLowerCase().includes(term)
      const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(term))
      return inName || inCategory || inTags
    })
  }, [search, products])

  // Paginated slice
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const loadMore = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
      setLoadingMore(false)
    }, 600)
  }

  const handleFilterClick = (filter) => {
    setSearch(filter === 'All' ? '' : filter)
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setVisibleCount(ITEMS_PER_PAGE)
  }

  return (
    <div className="min-h-screen w-full" style={{ background: colors.background }}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

      {/* Page Header */}
      <div
        className="w-full px-4 md:px-10 lg:px-16 pt-10 pb-8 flex flex-col gap-2"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <p className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: colors.accent }}>
          — Shop
        </p>
        <h1
          className="text-2xl md:text-4xl font-black leading-tight"
          style={{ color: colors.primaryText, letterSpacing: '-0.01em' }}
        >
          Browse Collection
        </h1>
        <p className="text-sm font-light" style={{ color: colors.secondaryText }}>
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} available
        </p>
      </div>

      <div className="w-full px-4 md:px-10 lg:px-16 py-6 flex flex-col gap-6">

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <i
              className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
              style={{ color: searchFocused ? colors.accent : colors.secondaryText }}
            />
            <input
              type="text"
              placeholder="Search by name, category or tag..."
              value={search}
              onChange={handleSearchChange}
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
                onClick={() => { setSearch(''); setVisibleCount(ITEMS_PER_PAGE) }}
                style={{ color: colors.secondaryText }}
              >
                <i className="fas fa-times text-xs" />
              </button>
            )}
          </div>

          <div
            className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.border}` }}
          >
            <i className="fas fa-box-open text-xs" style={{ color: colors.accent }} />
            <span className="text-xs font-medium" style={{ color: colors.secondaryText }}>
              {filtered.length} items
            </span>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filters.map((filter) => {
            const isActive = search.toLowerCase() === filter.toLowerCase() || (filter === 'All' && !search)
            return (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className="px-4 py-2 rounded-xl text-xs font-semibold flex-shrink-0 transition-all duration-200"
                style={{
                  background: isActive ? colors.accent : 'rgba(255,255,255,0.04)',
                  color: isActive ? '#1A1A1A' : colors.secondaryText,
                  border: `1px solid ${isActive ? colors.accent : colors.border}`,
                }}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <i className="fas fa-box-open text-4xl" style={{ color: colors.border }} />
            <p className="text-sm font-semibold" style={{ color: colors.primaryText }}>
              No products found
            </p>
            <p className="text-xs text-center" style={{ color: colors.secondaryText }}>
              {search
                ? `No results for "${search}". Try a different search or filter.`
                : 'No products available yet.'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="px-5 py-2 rounded-xl text-xs font-semibold"
                style={{ background: colors.accent, color: '#1A1A1A' }}
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {loadingMore && <MiniSkeleton colors={colors} />}
            </div>

            {/* Load more */}
            {hasMore && !loadingMore && (
              <button
                onClick={loadMore}
                className="w-full py-4 rounded-2xl text-sm font-semibold transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${colors.border}`,
                  color: colors.secondaryText,
                }}
              >
                Load More <i className="fas fa-chevron-down ml-2 text-xs" />
              </button>
            )}

            {!hasMore && filtered.length > ITEMS_PER_PAGE && (
              <p className="text-center text-xs" style={{ color: colors.border }}>
                You've seen all {filtered.length} products
              </p>
            )}
          </>
        )}

      </div>
      <NavBottom />
    </div>
  )
}
