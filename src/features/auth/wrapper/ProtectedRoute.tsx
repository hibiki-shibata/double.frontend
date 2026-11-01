// components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute() {
    const { user, isAuthenticated } = useAuth()
    const location = useLocation()

    if (!isAuthenticated || !user) {
        return <Navigate to="/auth" state={{ from: location }} replace /> // Save current location so the user can be redirected back after login
    }

    return <Outlet />
}