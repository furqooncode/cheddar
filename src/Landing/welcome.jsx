import Header from '../Header.jsx';
import colors from '../colors.jsx'
import mockup from "../assets/mockup.png"
import test from "../assets/test.png"

export function Com(){
  return(
    <div className="h-[85vh] w-[100%] flex flex-wrap  items-center
    justify-between">
  
  {/*The name*/}  
  <div className="max-w-md h-full grid place-items-center items-center gap-2">
    <div className="grid items-center place-items-center p-4">
   <h1 className="font-bold text-3xl text-center uppercase" 
   style={{
        color : colors.text,
        fontFamily: "Orbitron",
      }}>Enter the Cheddar Drop!</h1>
   <p style={{
     color:colors.primaryText,
     fontFamily:"italic"
   }} className="text-lg font-semibold text-gray-500">..Where Rarity Meets
   Comfort..</p>
      <span className="text-sm font-bold text-center"
      style={{
        color:colors.secondaryText,
      }}>Exclusively for the discerning gentleman.Limited-edition hoodies of superior craftsmanship, where luxury fabrics deliver refined comfort and
      understated distinction. Curated with impeccable detail for timeless
      elegance.</span>
      
  {/*button*/}
      <div className="flex w-full p-3 flex-wrap justify-center items-center gap-2">
      <button className="p-[10px] border-none outline-none 
      rounded-[12px] w-[170px] font-semibold text-lg" style={{
        backgroundColor: colors.deepAccent,
        color:colors.text,
      }}>Explore Now!</button>
      
      <button className="p-[10px] border-none outline-none w-[170px]
      rounded-[12px] font-semibold text-lg" style={{
        backgroundColor:colors.accent,
        color:colors.text,
      }}>Join Wait-List  <i className="fas fa-arrow-right"></i></button>
      
    </div>
    </div>  
    

  </div>
  
   {/*The Image*/}  
   <div className="relative max-w-md h-full grid place-items-center items-center
   p-2">
     
  <div className="w-[95%] h-[70%] rounded-[50%]"
  style={{
    backgroundColor:colors.container,
  }}>
      <img 
      src={mockup}
     alt="product feel"
     className="w-full h-full object-fit"
      />
  </div>

<div className="w-full items-center justify-center">
   <p style={{
    color: colors.secondaryText,
  }}>Yes thats the best  website ever i have seen , shop with us and come
  again!!</p>
</div>
 

{/* Div one - Top Left */}
<div className="absolute left-[12px] top-[110px] w-[120px] h-[80px] z-100 rounded-[10px] grid gap-[3px] overflow-hidden p-[3px]"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}>
  <div className="w-full flex items-center gap-2 text-white">
    <i className="fas fa-hand-sparkles"></i>
    <p className="text-sm font-semibold" style={{ color: colors.secondaryText }}>Curated</p>
  </div>
  <span className="text-sm" style={{ color: colors.text, fontFamily: "cursive" }}>Handpicked with intention</span>
</div>


{/* Div one - Top Top */}
<div className="absolute top-[45px] w-[120px] h-[80px] z-100 rounded-[10px] grid gap-[3px] overflow-hidden p-[3px]"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}>
  <div className="w-full flex items-center gap-2 text-white">
    <i className="fas fa-user-tie"></i>
    <p className="text-sm font-semibold" style={{ color: colors.secondaryText }}>Personal</p>
  </div>
  <span className="text-sm" style={{ color: colors.text, fontFamily: "cursive" }}> Tailored to your style</span>
</div>

{/* Div two - Bottom Left */}
<div className="absolute left-[12px] bottom-[160px] w-[120px] h-[80px] z-100 rounded-[10px] grid gap-[3px] overflow-hidden p-[3px]"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}>
  <div className="w-full flex items-center gap-2 text-white">
    <i className="fas fa-gem"></i>
    <p className="text-sm font-semibold" style={{ color: colors.secondaryText }}>Premium</p>
  </div>
  <span className="text-sm" style={{ color: colors.text, fontFamily: "cursive" }}>Finest fabrics & finishing</span>
</div>

{/* Div three - Top Right */}
<div className="absolute right-[12px] top-[110px] w-[120px] h-[80px] z-100 rounded-[10px] grid gap-[3px] overflow-hidden p-[3px]"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}>
  <div className="w-full flex items-center gap-2 text-white">
    <i className="fas fa-crown"></i>
    <p className="text-sm font-semibold" style={{ color: colors.secondaryText }}>Exclusive</p>
  </div>
  <span className="text-sm" style={{ color: colors.text, fontFamily: "cursive" }}>Limited, one-of-a-kind pieces</span>
</div>

{/* Div four - Bottom Right */}
<div className="absolute right-[12px] bottom-[160px] w-[120px] h-[80px] z-100 rounded-[10px] grid gap-[3px] overflow-hidden p-[3px]"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}>
  <div className="w-full flex items-center gap-2 text-white">
    <i className="fas fa-star"></i>
    <p className="text-sm font-semibold" style={{ color: colors.secondaryText }}>Elegant</p>
  </div>
  <span className="text-sm" style={{ color: colors.text, fontFamily: "cursive" }}>Luxurious feel & presentation</span>
</div>

{/* Div four - Bottom Bottom */}
<div className="absolute bottom-[120px] w-[120px] h-[80px] z-100 rounded-[10px] grid gap-[3px] overflow-hidden p-[3px]"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}>
  <div className="w-full flex items-center gap-2 text-white">
    <i className="fas fa-clock-rotate-left"></i>
    <p className="text-sm font-semibold" style={{ color: colors.secondaryText }}>Timeless</p>
  </div>
  <span className="text-sm" style={{ color: colors.text, fontFamily: "cursive" }}>Classic meets modern trends</span>
</div>


</div>
    </div>
    )
}

export default function Welcome(){
  return(
    <div className="w-[100%] p-0 m-0"
    style={{
      background:colors.background,
    }}>
      <Header />
      <Com />
    </div>
    )
}