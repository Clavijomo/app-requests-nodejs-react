import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../api/requestService";
import { setAuthToken } from "../api/appClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [registeredUser, setRegisteredUser] = useState(null);
    const [loading, setLoading] = useState(true);
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
        setLoading(false);
    }, [])

    const handleLogin = async (data) => {
        setLoading(true);
        setError('');

        try {
            const { data: userData, token, error } = await loginUser(data);
            if (error) {
                return setError(error)
            }

            if (token) {
                localStorage.setItem('token', token);
                setAuthToken(token)
                setIsAuthenticated(userData);
                return true;
            }
        } catch (err) {
            setError(err || "Error en el inicio de sesión");
        } finally {
            setLoading(false);
        }

        return false;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setIsAuthenticated(false);
        setRegisteredUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                handleLogin,
                isAuthenticated,
                handleLogin,
                registeredUser,
                handleLogout,
                error,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useDataHook = () => {
    return useContext(AuthContext);
}