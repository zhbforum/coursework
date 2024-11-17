import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRole }) 
{
    const token = localStorage.getItem('token');

    if (!token) 
    {
        return <Navigate to="/login" />;
    }

    try 
    {
        const decoded = jwtDecode(token); 
        if (decoded.role !== allowedRole) 
        {
            return <Navigate to="/" />;
        }
    } 
    catch (error) 
    {
        console.error('Token error:', error);
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;
