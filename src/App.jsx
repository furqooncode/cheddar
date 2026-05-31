import AppRoutes from './routes.jsx'
import  useTheme  from './Client/Toggletheme.jsx';
import { useEffect } from 'react'

export default function App(){
  
 const { colors } = useTheme();
 
 

  useEffect(() => {
    import("vconsole").then(({ default: VConsole }) => {
      new VConsole();
    });
    console.log("page mounted!!");
  }, []);
  
  
  return(
    <div style={{
      background: colors.background,
    }}>
        <AppRoutes />
    </div>
 
    )
}

