import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, tokens } = useAuth();
    const location = useLocation();

    // If not authenticated, redirect to login with return path
    if (!isAuthenticated || !tokens) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated, render children
    return <>{children}</>;
}