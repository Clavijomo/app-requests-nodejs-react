import { useEffect, useState } from "react"
import { setAuthToken } from "../api/appClient.js";
import { loginUser } from "../api/requestService.js";

export const useFetchingLogin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true);
            return
        }

        setIsAuthenticated(false);
    }, [])

    const handleLogin = async (data) => {
        try {
            return await loginUser(data);
        } catch (err) {
            return err || "Hubo un error";
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        setAuthToken(null);
        setIsAuthenticated(false);
    }


    return {
        handleLogout,
        handleLogin,
        isAuthenticated
    }
}