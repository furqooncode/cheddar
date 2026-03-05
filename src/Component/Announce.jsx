import colors from '../color.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const announcements = [
  {
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1200",
    title: "New Season Drop",
    subtitle: "Premium hoodies & tracksuits — built for comfort & style",
    cta: "Shop Now →",
  },
  {
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200",
    title: "Free Shipping Nationwide",
    subtitle: "On all orders over ₦50,000 — no hidden fees",
    cta: "Explore Collection →",
  },
  {
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200",
    title: "1 CHD = ₦1,500",
    subtitle: "Earn more Cheddar Coins with every purchase — stack rewards fast",
    cta: "Start Earning →",
  },
  {
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=1200",
    title: "Limited Edition Tracksuits",
    subtitle: "Only 50 pieces available — don't miss out",
    cta: "Claim Yours Now →",
  },
  {
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200",
    title: "Fresh Arrivals",
    subtitle: "Oversized tees & utility cargos — street-ready luxury",
    cta: "See What's New →",
  },
];

export default function Announce() {
  return (
    <div className="w-full px-3 py-4 md:px-6 lg:px-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={16}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full h-[340px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl"
        style={{
          background: colors.container,
          border: `1px solid ${colors.border}`,
        }}
      >
        {announcements.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image with Overlay */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.65] scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
                <h3
                  className="text-2xl md:text-4xl font-bold tracking-tight mb-3 drop-shadow-lg"
                  style={{ color: colors.primaryText }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-base md:text-xl font-medium max-w-2xl mx-auto mb-6 drop-shadow-md"
                  style={{ color: colors.text }}
                >
                  {item.subtitle}
                </p>

         <button
     className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 shadow-lg"
                  style={{
                    borderColor: colors.accent,
                    color: colors.accent,
                  }}
                >
                  {item.cta}
                </button>
                
                
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}