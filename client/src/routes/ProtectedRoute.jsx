import { Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { AuthUserPath } from './auth';
import { useDataHook } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useDataHook();

    if (loading) {
        <Stack> Loading...</Stack>
    }

    return isAuthenticated ? children : <Navigate to={AuthUserPath.signUp} />
};
