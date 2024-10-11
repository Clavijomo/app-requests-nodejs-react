import { AuthUserPath } from "../routes/auth";
import { getRoleFromToken } from "./getRoleFromToken.js";

export const getTokenAndResponse = async (response, navigate, typeToken) => {
    await getRoleFromToken(response.token);
    localStorage.setItem(typeToken, response.data.token);
    navigate(AuthUserPath.dashboard)
}