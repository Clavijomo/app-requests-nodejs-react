import { Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { AuthUserPath } from './auth';
import { useDataHook } from '../context/AuthContext';

export const ProtectedRoute = ({ children, redirectTo = AuthUserPath.signUp }) => {
    const isAuthenticated = localStorage.getItem('token');;


    return isAuthenticated ?
        children
        :
        <Navigate to={redirectTo} />
};
