// components/ProtectedRoute.jsx
import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
// import { useAuth } from '../context/AuthContext'; // Replace with your auth state source

export function ProtectedRoute() {
    const [isAuthed, setIsAuthed] = useState(false)
    const location = useLocation()

    if (!isAuthed) {
        // Save current location so the user can be redirected back post-login
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <Outlet />
};