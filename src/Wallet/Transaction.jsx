import Balance from './balance.jsx'
import History from './history.jsx';
import NavBottom from '../Component/NavBottom.jsx'
import { useQuery } from '@tanstack/react-query';
import supabase from '../lib/util.jsx';


export default function Transaction(){
  return(
    <>
       <Balance />
      <History />
      <NavBottom />
    </>
   
    )
}