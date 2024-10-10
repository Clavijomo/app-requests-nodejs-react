import { jwtDecode } from "jwt-decode";

export const getRoleFromToken = async (token = localStorage.getItem('token')) => {
    if (!token) return null;

    try {
        const decodeToken = await jwtDecode(token);
        localStorage.setItem("role", decodeToken.user.role)
        localStorage.setItem("email", decodeToken.user.email)

    } catch (err) {
        return err;
    }
}