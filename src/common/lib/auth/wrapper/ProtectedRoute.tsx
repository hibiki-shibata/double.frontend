// components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../../../config/routes';

export function ProtectedRoute() {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.AUTH({})} state={{ from: location }} replace /> // Save current location so the user can be redirected back after login
    }

    return <Outlet />
}