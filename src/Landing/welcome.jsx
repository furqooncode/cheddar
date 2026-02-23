import Header from '../Header.jsx';
import colors from '../colors.jsx'
import mockup from "../assets/mockup.png"
{/*

1.
Topic: Curated
Description: Handpicked with intention
Icon: fa-solid fa-hand-sparkles
2.
Topic: Premium Quality
Description: Finest fabrics & finishing
Icon: fa-solid fa-gem
3.
Topic: Exclusive
Description: Limited, one-of-a-kind pieces
Icon: fa-solid fa-crown
4.
Topic: Elegant
Description: Luxurious feel & presentation
Icon: fa-solid fa-star
5.
Topic: Personal
Description: Tailored to your style
Icon: fa-solid fa-user-tie
6.
Topic: Timeless
Description: Classic meets modern trends
Icon: fa-solid fa-clock-rotate-left
*/}

export function Com(){
  return(
    <div className="h-[85vh] w-[100%] flex flex-wrap  items-center
    justify-between">
  
  {/*The name*/}  
  <div className="max-w-md h-full grid place-items-center items-center">
   <h1 className="font-bold text-3xl text-center uppercase p-2" 
   style={{
        color : colors.text,
        fontFamily: "Orbitron",
      }}>Welcome To Cheddar luxury!!</h1>
  </div>
  
   {/*The Image*/}  
   <div className="relative max-w-md h-full grid place-items-center items-center
   p-2">
     
  <div className="w-[90%] h-[70%] rounded-[50%]"
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