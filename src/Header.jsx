import colors from './colors.jsx'
export default function Header(){
  return(
    <div className="pb-[80px]">
      <nav className="fixed w-[100%] z-1000 h-[70px] flex justify-between
      items-center p-3 top-0 left-0"
      style={{
        background:colors.background,
      }}>
        <div className="bg-blue-400 w-[50px] h-[50px] rounded-[50%]">
          <img 
          src="?"
          alt="logo"
          className="w-[100%] h-[100%]"
          />
          </div>
          
        {/*}Show ONLY on mobile*/}
      <div className="bg-red-400 lg:hidden">
       <p className="block text-white font-semibold text-sm">☰</p>
        </div>

    {/*Show ONLY on large screen*/}
    <div className="hidden lg:flex items-center gap-4">
  <p className="text-white text-sm ">Home</p>
  <p className="text-white text-sm ">About</p>
  <p className="text-white text-sm ">Join Waitlist</p>
      </div>
      
      
      </nav>
    </div>
    )
}