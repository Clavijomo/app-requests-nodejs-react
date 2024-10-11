import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../../api/requestService.js';
import { getTokenAndResponse } from '../../../../helpers/getTokenAndResponse.js';
import { AuthUserPath } from '../../../../routes/auth.js';
import { registerSchema } from '../../../../validations/auth.js';
import { RegisterPrincipal } from './RegisterPrincipal.jsx';

export const RegisterForm = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const handleRedirectLogin = () => {
        setTimeout(() => {
            navigate(AuthUserPath.login)
        }, 500)
    };

    const onSubmit = async (data) => {
        const response = await createUser({ ...data, role: Number(data.role) });
        if (response.status >= 200 || response.status <= 300) {
            return await getTokenAndResponse(response, navigate, 'token');
        }

        return navigate(AuthUserPath.signUp);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
                <FormControl sx={{ width: '100%', gap: 2 }}>
                    <FormLabel>Elige tu rol</FormLabel>
                    <Controller
                        name='role'
                        control={control}
                        defaultValue={'1'}
                        render={({ field }) => (
                            <RadioGroup {...field}>
                                <Stack direction={'row'} justifyContent={'space-evenly'} gap={2}>
                                    <Stack width={'50%'} border={'1px solid #ededed'} padding={1} borderRadius={'20px'}>
                                        <FormControlLabel value={'1'} control={<Radio />} label="Administrador" />
                                    </Stack>
                                    <Stack width={'50%'} border={'1px solid #ededed'} padding={1} borderRadius={'20px'}>
                                        <FormControlLabel value={'2'} control={<Radio />} label="Empleado" />
                                    </Stack>
                                </Stack>
                            </RadioGroup>
                        )}
                    />
                    {errors.role && <Typography color='error' >{errors.role.message}</Typography>}
                </FormControl>

                <RegisterPrincipal
                    errors={errors}
                    register={register}
                />

                <Button variant='contained' sx={{ width: '30%', textTransform: 'initial', fontSize: 16 }} type='submit'>Registrarse</Button>
                <Stack direction={'row'} alignItems={'center'}>
                    <Typography color='text.secondary'>¿Ya tienes cuenta?</Typography>
                    <Button onClick={handleRedirectLogin} sx={{ textTransform: 'initial' }}>Inicia sesión</Button>
                </Stack>
            </Stack>
        </form>
    )
}
