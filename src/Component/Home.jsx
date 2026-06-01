import useTheme from '../Client/Toggletheme.jsx'
import { useEffect } from 'react'
import useCart from '../Client/CartStorage.jsx';
import { useQuery } from "@tanstack/react-query";
import supabase from "../lib/util.jsx";
import { useNavigate } from 'react-router-dom';
import HomeSkeleton from '../Skeleton/HomeSkeleton.jsx'
import Announce from './Announce.jsx'
import  ProductCard  from './ProductCard.jsx'
import NavBottom from './NavBottom.jsx'

const MAX_HOME_PRODUCTS = 20

export default function Home(){
  useEffect(() => {
  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error.message);
      return;
    }
    const email = data.user?.user_metadata?.email || data.user?.email;
    console.log("user email:", email);
  };
  fetchUser();
}, []);

  const { colors } = useTheme();
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const { data: products = [], isPending, isError, error } = useQuery({
    queryKey: ['Userproducts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*')
      if (error) throw error
      return data
    }
  });

  if (isPending) return <HomeSkeleton />

  if (isError) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: colors.background }}>
      <div className="text-center max-w-md">
        <i className="fas fa-triangle-exclamation text-6xl mb-4" style={{ color: colors.accent }} />
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.primaryText }}>Oops! Something went wrong</h2>
        <p className="mb-6" style={{ color: colors.secondaryText }}>{error?.message || 'Failed to load products'}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
          style={{ background: colors.accent, color: '#1A1A1A' }}>
          Try Again
        </button>
      </div>
    </div>
  )

  const filters = [
    "All",
    ...Array.from(
      new Set([
        ...(products?.map((p) => p.category).filter(Boolean) || []),
        ...(products?.flatMap((p) => p.tags || []).filter(Boolean) || []),
      ])
    ),
  ]

  const visibleProducts = products?.slice(0, MAX_HOME_PRODUCTS) || []

  return(
    <div style={{
      background:colors.background,
    }}>
      <Announce />
      
      {/* Empty State */}
      {products?.length === 0 ? (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <i className="fas fa-box-open text-6xl mb-4 opacity-50" style={{ color: colors.text }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: colors.primaryText }}>No Products Available</h2>
            <p className="mb-6" style={{ color: colors.secondaryText }}>Check back soon for new items!</p>
            <button 
              onClick={() => navigate('/chd/Browse')}
              className="px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
              style={{ background: colors.accent, color: '#1A1A1A' }}>
              Browse Collection
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Labels */}
          <div
            className="w-full flex items-center gap-2 overflow-hidden px-2"
            style={{ background: colors.background }}
          >
            <h3 className="text-sm font-semibold flex-shrink-0" style={{ color: colors.text }}>
              <i className="fas fa-sliders" />
            </h3>

            <div className="flex min-w-0 items-center gap-2 overflow-x-auto scrollbar-hide">
              {filters.map((label) => (
                <button
                  key={label}
                  className="px-4 h-7 rounded-lg outline-none text-xs font-semibold flex items-center text-white flex-shrink-0 hover:opacity-80 transition-all"
                  style={{ background: colors.accent }}
                  onClick={() => navigate('/chd/Browse', {
                    state: {
                      from: 'home',
                      search: label === 'All' ? '' : label,
                      focus: true,
                    },
                  })}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-2 w-full">
            <div className="mt-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {visibleProducts.map((product) => (
                    <ProductCard 
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  handleMove={()=> {
                       navigate(`/chd/productdetails/${product.id}`, { state: product })
                      }}
                  />
                ))}
              </div>
            </div>
          </div>
          {products?.length > MAX_HOME_PRODUCTS && (
            <div className="flex justify-center px-2 pb-6">
              <button
                onClick={() => navigate('/chd/Browse', {
                  state: { from: 'home', search: '', focus: true },
                })}
                className="px-6 py-3 rounded-2xl font-semibold transition-all hover:opacity-90"
                style={{ background: colors.accent, color: '#1A1A1A' }}
              >
                See More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}



 
