import { zodResolver } from "@hookform/resolvers/zod";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Alert, Button, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDataHook } from "../../../context/AuthContext";
import { useShowPassword } from "../../../hooks/useShowPassword";
import { AuthUserPath } from "../../../routes/auth";
import { loginSchema } from "../../../validations/auth";
import { CustomTooltip } from "../../../components/CustomTooltip";
import { getRoleFromToken } from "../../../helpers/getRoleFromToken";

export const LoginForm = () => {
    const navigate = useNavigate();

    const { handleClickShowPassword, showPassword } = useShowPassword();
    const { handleLogin, error, loading } = useDataHook();
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const handleRedirectSignUp = () => {
        setTimeout(() => {
            navigate(AuthUserPath.signUp);
        }, 500)
    }

    const onSubmit = async (data) => {
        const response = await handleLogin(data);
        if (response.status >= 200 || response.status <= 300) {
            await getRoleFromToken(response.token);
            localStorage.setItem('token', response.data.token);
            navigate(AuthUserPath.dashboard);
            return;
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
                    {error &&
                        <Alert title="Hola" severity="error">{error}</Alert>
                    }
                    <Button
                        sx={{ width: "80%", margin: "auto", textTransform: "initial", fontSize: 16 }}
                        type="submit"
                        variant="contained"
                    >
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </Button>
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
