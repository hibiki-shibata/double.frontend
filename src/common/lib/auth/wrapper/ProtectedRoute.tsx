import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../../../config/routes';
import { LoadingState } from '../../../components/StatusState';

export function ProtectedRoute() {
    const location = useLocation()
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth()

    if (isAuthLoading) {
        return (
        <div className="flex items-center justify-center h-screen">
           <LoadingState message='Authenticating..'/> 
        </div>

        )
    }

    if (!isAuthenticated && !isAuthLoading) {
        return <Navigate to={ROUTES.AUTH({})} state={{ from: location }} replace />
    }

    return <Outlet />
}