import { createContext, useContext } from "react";
import { setAuthToken } from "../api/appClient";
import { useFetchingLogin } from "./AuthActions";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const {
        handleLogin,
        handleLogout,
        isAuthenticated,
    } = useFetchingLogin();

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login: (data) => handleLogin(data),
                handleLogout: () => handleLogout(setAuthToken),
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useDataHook = () => {
    return useContext(AuthContext);
}