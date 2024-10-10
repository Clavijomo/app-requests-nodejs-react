import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/requestService";
import { AuthUserPath } from "../../routes/auth";
import { registerSchema } from "../../validations/auth";

export const useRegisterSechema = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data) => {
        data.role = Number(data.role);
        const response = await createUser(data);
        console.log(response)
        if (response.status >= 200 || response.status <= 300) {
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            return;
        }

        return alert('Hubo un error')
    }

    return {
        errors,
        control,
        onSubmit,
        register,
        handleSubmit,
    }
}