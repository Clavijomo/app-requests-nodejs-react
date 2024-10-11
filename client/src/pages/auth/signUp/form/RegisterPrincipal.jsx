import { VisibilityOutlined } from '@mui/icons-material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { IconButton, InputAdornment, OutlinedInput, Stack } from '@mui/material';
import { CustomTooltip } from '../../../../components/CustomTooltip';
import { useShowPassword } from '../../../../hooks/auth/useShowPassword';

export const RegisterPrincipal = ({ register, errors }) => {
    const { handleClickShowPassword, showPassword } = useShowPassword();

    return (
        <Stack gap={2}>
            <CustomTooltip message={errors?.name?.message}>
                <OutlinedInput
                    sx={{
                        borderRadius: '20px',
                        border: errors?.name && '1px solid red'
                    }}
                    {...register('name')}
                    placeholder='Nombre'
                />
            </CustomTooltip>
            <CustomTooltip message={errors?.email?.message}>
                <OutlinedInput
                    sx={{ borderRadius: '20px', border: errors?.email && '1px solid red' }}
                    {...register('email')}
                    placeholder='Correo'
                />
            </CustomTooltip>
            <CustomTooltip message={errors?.password?.message}>
                <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton onClick={handleClickShowPassword}>
                                {showPassword ? <VisibilityOutlined color='primary' /> : <VisibilityOffOutlinedIcon />}
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{
                        borderRadius: '20px',
                        border: errors?.password && '1px solid red'
                    }}
                    {...register('password')}
                    placeholder='Contraseña'
                />
            </CustomTooltip>
        </Stack>
    )
}
