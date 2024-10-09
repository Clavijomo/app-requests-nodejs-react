
import { createContext, useContext, useState } from "react";
import { createUser } from "../api/requestService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [newUser, setNewUSer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleNewUser = async (data) => {
        try {
            const response = await createUser(data);
            setNewUSer(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false)
        }
    }


    return (
        <AuthContext.Provider
            value={{
                handleNewUser,
                newUser,
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