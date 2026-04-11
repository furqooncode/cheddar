import useTheme from '../Client/Toggletheme.jsx'

import Announce from './Announce.jsx'
import Products from './Products.jsx'
import NavBottom from './NavBottom.jsx'
export default function Home(){
  const { colors } = useTheme();
  return(
    <div style={{
      background:colors.background,
    }}>
      <Announce />
      <Products />
      <NavBottom />
    </div>
    )
}