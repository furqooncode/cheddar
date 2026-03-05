import colors from '../color.jsx'
import Header from './Header.jsx';
import Hero from './Hero.jsx';


export default function Welcome(){
  return(
    <div className="w-[100%] p-0 m-0"
    style={{
      background:colors.background,
    }}>
      <Header />
      <Hero />
    </div>
    )
}