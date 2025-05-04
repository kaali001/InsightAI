// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { JSX } from 'react';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated, loading } = useAuthStore();
  
    if (loading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>; // Or spinner
    }
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  }