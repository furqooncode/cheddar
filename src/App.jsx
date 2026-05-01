import AppRoutes from './routes.jsx'
import { useEffect } from 'react';
import  useTheme  from './Client/Toggletheme.jsx';
import  useAuth  from './Client/Auth.jsx';

export default function App(){
const { getUser } = useAuth();
 const { colors } = useTheme();
 
 useEffect(()=>{
  getUser();
},[])

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

import DashboardApp from "./dashboard/DashboardApp";
export default function App() {
  return <DashboardApp />;
}
