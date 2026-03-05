import colors from '../color.jsx'

const products = [
  {
    name: "Oversized Black Essential Hoodie",
    description: "Heavyweight cotton fleece with dropped shoulders and ribbed cuffs for ultimate street-ready comfort.",
    price: "₦45,000",
    originalPrice: "₦58,500", // ~30% off example
    discountPercent: 23,
    cheddarCoin: "30 CHD",
    image: "https://static.independent.co.uk/2025/01/15/13/MS-best-mens-hoodies-indybest.jpg",
  },
  {
    name: "Graphic Print All-Over Hoodie",
    description: "Bold urban print on premium cotton blend, relaxed fit with kangaroo pocket and adjustable hood.",
    price: "₦38,000",
    cheddarCoin: "25 CHD",
    // No discount on this one
    image: "https://modaknits.com/wp-content/uploads/2023/09/ericwen_340_The_image_showcases_a_young_man_wearing_a_stylish_a_22587368-1202-4fd9-b734-5b9df8c74282.png",
  },
  {
    name: "Slim Fit Chino Trousers",
    description: "Tailored stretch cotton chinos in neutral tones with clean lines, perfect for smart-casual versatility.",
    price: "₦28,500",
    originalPrice: "₦36,000",
    discountPercent: 21,
    cheddarCoin: "19 CHD",
    image: "https://i.ebayimg.com/images/g/CHMAAOSwoAFjCBNV/s-l1200.jpg",
  },
  {
    name: "Navy Embroidered Polo Shirt",
    description: "Breathable piqué cotton polo with subtle chest embroidery and classic three-button placket.",
    price: "₦18,000",
    cheddarCoin: "12 CHD",
    // No discount
    image: "https://m.media-amazon.com/images/I/51a6wffhW0L.jpg_BO30,255,255,255_UF750,750_SR1910,1000,0,C_QL100_.jpg",
  },
  {
    name: "Luxury Zip-Track Tracksuit Set",
    description: "Modern slim-fit tracksuit in premium cotton blend with contrast stripes, ideal for casual or active wear.",
    price: "₦65,000",
    originalPrice: "₦85,000",
    discountPercent: 24,
    cheddarCoin: "43 CHD",
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/7f800c31-a04a-4979-ad49-e73697212f03.__CR0,0,970,600_PT0_SX970_V1___.jpg",
  },
  {
    name: "Relaxed Cargo Utility Pants",
    description: "Lightweight cotton cargo pants with multiple pockets, drawstring waist, and tapered leg for everyday utility.",
    price: "₦32,000",
    cheddarCoin: "21 CHD",
    // No discount
    image: "https://m.media-amazon.com/images/I/61tiHVAEEfL.jpg_BO30,255,255,255_UF750,750_SR1910,1000,0,C_QL100_.jpg",
  },
  {
    name: "Vintage Oversized Acid Wash Tee",
    description: "Heavyweight cotton oversized tee in acid-wash finish for a timeless streetwear edge.",
    price: "₦15,000",
    originalPrice: "₦19,500",
    discountPercent: 23,
    cheddarCoin: "10 CHD",
    image: "https://m.media-amazon.com/images/I/71tRcJFCmnL._AC_UY1000_.jpg",
  },
];

export function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6 lg:p-8">
      {products.map((product, index) => {
        const hasDiscount = product.discountPercent && product.originalPrice;

        return (
          <div
            key={index}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            style={{
              backgroundColor: colors.container,
              borderColor: colors.border,
            }}
          >
            {/* Product Image + Discount Badge */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Discount Badge (top-left) */}
              {hasDiscount && (
                <div
                  className="absolute top-3 left-3 z-10 flex items-center
                  justify-center w-14 h-14 rounded-full font-bold text-black shadow-md
                  text-sm"
        style={{
       backgroundColor: colors.neutralLight || "#C19A6B", // warm muted gold/caramel
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}>
     -{product.discountPercent}%
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  className="bg-white text-black px-6 py-3 rounded-full font-medium text-sm shadow-lg hover:bg-gray-100 transition-colors"
                  aria-label="Quick view"
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col gap-3">
              <h3
                className="text-lg md:text-xl font-semibold line-clamp-2"
                style={{ color: colors.primaryText }}
              >
                {product.name}
              </h3>

              <p
                className="text-sm text-gray-600 line-clamp-2 leading-relaxed"
                style={{ color: colors.secondaryText }}
              >
                {product.description}
              </p>

              {/* Price Section with Discount */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <span
                    className="text-xl md:text-2xl font-bold tracking-tight"
                    style={{ color: colors.text }}
                  >
                    {product.cheddarCoin}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className="text-base font-medium"
                      style={{ color: colors.secondaryText }}
                    >
                      {product.price}
                    </span>

                    {hasDiscount && (
                      <span
                        className="text-sm line-through opacity-60"
                        style={{ color: colors.secondaryText }}
                      >
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Circular Cart Button */}
                <button
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
                  style={{ backgroundColor: colors.accent }}
                  aria-label="Add to cart"
                >
                  <i className="fas fa-shopping-cart text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}



export default function Products() {
  return (
    <div className="p-2 w-full">

      <div className="w-full flex items-center gap-2 overflow-hidden"
        style={{ background: colors.background }}>

        {/* Filter icon */}
        <h3 className="text-sm font-semibold flex-shrink-0"
          style={{ color: colors.text }}>
          <i className="fas fa-sliders"></i>
        </h3>

        {/* Scrollable buttons */}
        <div className="flex min-w-0 items-center gap-2 overflow-x-auto scrollbar-hide">

          <button className="p-4 h-[25px] rounded-[10px] outline-none
          text-sm font-semibold flex items-center text-white flex-shrink-0
          hover:opacity-80 transition-all"
          style={{ background: colors.accent }}>
            All
          </button>

          <button className="p-4 h-[25px] rounded-[10px] outline-none
          text-sm font-semibold flex items-center text-white flex-shrink-0
          hover:opacity-80 transition-all"
          style={{ background: colors.accent }}>
            Hoodie
          </button>

          <button className="p-4 h-[25px] rounded-[10px] outline-none
          text-sm font-semibold flex items-center text-white flex-shrink-0
          hover:opacity-80 transition-all"
          style={{ background: colors.accent }}>
            Trousers
          </button>

          <button className="p-4 h-[25px] rounded-[10px] outline-none
          text-sm font-semibold flex items-center text-white flex-shrink-0
          hover:opacity-80 transition-all"
          style={{ background: colors.accent }}>
            Up & Down
          </button>

        </div>
      </div>
      
       <div className="mt-5">
        <ProductList />
       </div>
    
    </div>
  )
}
