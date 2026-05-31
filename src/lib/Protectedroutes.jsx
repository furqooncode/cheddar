import useAuth from '../Client/Auth.jsx';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { user, loading, sessionLoading, sessionChecked, getUser } = useAuth();

  useEffect(() => {
    if (!user && !sessionChecked) {
      getUser();
    }
  }, [getUser, user, sessionChecked]);

  if (loading || sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
           style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/Welcome" replace />;
  }

  return children;
}