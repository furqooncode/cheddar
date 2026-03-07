import AppRoutes from './routes.jsx'
import { useEffect } from 'react'
export default function App(){
  
  useEffect(() => {
    import('vconsole').then(({ default: VConsole }) => {
      new VConsole();
    });
    console.log("page mounted!!")
  }, []);
  
  return(
   <AppRoutes />
    )
}