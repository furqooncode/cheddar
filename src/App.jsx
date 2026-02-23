import Welcome from './Landing/welcome.jsx';
import colors from './colors.jsx'
export default function App(){
  return(
 <div style={{
   background:colors.background,
 }}>
   <Welcome />
 </div>
    )
}