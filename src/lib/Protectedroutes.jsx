import useAuth from '../Client/Auth.jsx';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}){
  const { user } = useAuth();
  if(!user){
    <Navigate to="/Welcome" />
  }
  return children
}