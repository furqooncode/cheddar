import AppRoutes from './routes.jsx'
import { useEffect } from 'react';
import  useTheme  from './Client/Toggletheme.jsx';
export default function App(){


  useEffect(() => {
    import("vconsole").then(({ default: VConsole }) => {
      new VConsole();
    });
    console.log("page mounted!!");
  }, []);
  const { colors } = useTheme();
  return(
    <div style={{
      background: colors.background,
    }}>
        <AppRoutes />
    </div>
 
    )
}
