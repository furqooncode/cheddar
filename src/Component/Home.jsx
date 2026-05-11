import useTheme from '../Client/Toggletheme.jsx'
import { useEffect } from 'react'
import useCart from '../Client/CartStorage.jsx';
import { useQuery } from "@tanstack/react-query";
import supabase from "../lib/util.jsx";
import { useNavigate } from 'react-router-dom';
import HomeSkeleton from '../Skeleton/HomeSkeleton.jsx'
import Announce from './Announce.jsx'
import ProductCard from './ProductCard.jsx'
import NavBottom from './NavBottom.jsx'
export default function Home(){
  useEffect(() => {
  // 1. Define the async function (renamed to avoid conflict)
  const fetchUser = async () => {
    // 2. Await the full response first
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
      return;
    }

    // 3. Access email from user_metadata or the user object directly
    const email = data.user?.user_metadata?.email || data.user?.email;
    console.log("user email:", email);
  };

  // 4. Call the function
  fetchUser();
}, []);



  const { colors } = useTheme();
  const { addToCart } = useCart()
const navigate = useNavigate()
  const { data: products, isPending, isError, error } = useQuery({
    queryKey: ['Userproducts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*')
      if (error) throw error
      return data
    }
  });
  


  if (isPending) return <HomeSkeleton />

  if (isError) return <p className="text-white">{error.message}</p>
  console.log(products)
  return(
    <div style={{
      background:colors.background,
    }}>
      <Announce />
    {/*labels*/}
    
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

 <div className="p-2 w-full">
    <div className="mt-5">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
    {products.map((product) => (
        <ProductCard 
      key={product.id}
      product={product}
      onAddToCart={addToCart}
      handleMove={()=> {
           navigate(`/productdetails/${product.id}`, { state: product })
          }}
      />
    ))}
  </div>
      </div>
    </div>
    
      <NavBottom />
    </div>
    )
}



 
