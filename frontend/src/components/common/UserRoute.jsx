import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const UserRoute = () => {
    const { user, isAuthenticated } = useAuth();

    // If logged in as admin, redirect to admin panel
    if (isAuthenticated && user?.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default UserRoute;
