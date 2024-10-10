import { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../api/appClient";
import { loginUser } from "../api/requestService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setAuthToken(token)
            setIsAuthenticated(true);
            return
        }

        setIsAuthenticated(false);
    }, [])

    const handleLogin = async (data) => {
        setError('');

        try {
            return await loginUser(data);
        } catch (err) {
            setError(err || "Error en el inicio de sesión");
        }

        return false;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        setAuthToken(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                error,
                isAuthenticated,
                handleLogin,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useDataHook = () => {
    return useContext(AuthContext);
}