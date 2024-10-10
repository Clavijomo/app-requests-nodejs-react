import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { createUser } from "../../api/requestService";
import { AuthUserPath } from "../../routes/auth";
import { registerSchema } from "../../validations/auth";
import { getRoleFromToken } from "../../helpers/getRoleFromToken";

export const useRegisterSechema = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data) => {
        const response = await createUser({ ...data, role: Number(data.role) });
        if (response.status >= 200 || response.status <= 300) {
            await getRoleFromToken(response.token);
            localStorage.setItem('token', response.data.token);
            navigate(AuthUserPath.dashboard);
            return;
        }

        return Navigate(AuthUserPath.signUp);
    }

    return {
        errors,
        control,
        onSubmit,
        register,
        handleSubmit,
    }
}