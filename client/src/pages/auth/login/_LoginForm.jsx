import { zodResolver } from "@hookform/resolvers/zod";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Alert, Button, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomTooltip } from "../../../components/CustomTooltip";
import { useDataHook } from "../../../context/AuthContext";
import { getTokenAndResponse } from "../../../helpers/getTokenAndResponse";
import { useShowPassword } from "../../../hooks/auth/useShowPassword";
import { AuthUserPath } from "../../../routes/auth";
import { loginSchema } from "../../../validations/auth";
import { useState } from "react";

export const LoginForm = () => {
    const navigate = useNavigate();
    const [errorRequest, setErrorRequest] = useState('');

    const { handleClickShowPassword, showPassword } = useShowPassword();
    const { login } = useDataHook();
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const handleRedirectSignUp = () => {
        setTimeout(() => {
            navigate(AuthUserPath.signUp);
        }, 500)
    }

    const onSubmit = async (data) => {
        const response = await login(data);
        if (response.status >= 200 || response.status <= 300) {
            await getTokenAndResponse(response, navigate, 'token');
        }

        if (response.status >= 400 || response.status < 500) {
            setErrorRequest('Email o contraseña incorrecta');
        }
    }

    return (
        <Stack width={"50%"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={3}>
                    <Stack gap={2}>
                        <CustomTooltip message={errors?.email?.message}>
                            <OutlinedInput
                                sx={{
                                    borderRadius: '20px',
                                    border: errors?.email && '1px solid red'
                                }}
                                {...register('email')}
                                placeholder="Correo"
                            />
                        </CustomTooltip>

                        <CustomTooltip message={errors?.password?.message}>
                            <OutlinedInput
                                {...register('password')}
                                placeholder="Contraseña"
                                type={showPassword ? "text" : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword}>
                                            {showPassword ? <VisibilityOutlined color="primary" /> : <VisibilityOffOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                sx={{
                                    borderRadius: 20,
                                    border: errors?.password && '1px solid red'
                                }}
                            />
                        </CustomTooltip>
                    </Stack>
                    {errorRequest &&
                        <Alert title="Hola" severity="error">{errorRequest}</Alert>
                    }
                    <Button
                        sx={{ width: "80%", margin: "auto", textTransform: "initial", fontSize: 16 }}
                        type="submit"
                        variant="contained"
                    >
                        Iniciar sesión
                    </Button>
                    {errorRequest &&
                        <Alert severity="error">{errorRequest}</Alert>
                    }
                    <Stack margin={'auto'} direction={'row'} alignItems={'center'} gap={1}>
                        <Typography color="text.secondary">¿No tienes cuenta?</Typography>
                        <Button
                            onClick={handleRedirectSignUp}
                            sx={{
                                textTransform: "initial", fontSize: 16
                            }}
                            variant="text">
                            Regístrate
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    )
}
