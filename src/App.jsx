import AppRoutes from './routes.jsx'
import { useEffect, useState } from 'react';
import  useTheme  from './Client/Toggletheme.jsx';
import  useAuth  from './Client/Auth.jsx';

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

