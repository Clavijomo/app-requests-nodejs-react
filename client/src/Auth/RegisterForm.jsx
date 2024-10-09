import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDataHook } from '../context/AuthContext';

export const RegisterForm = () => {
    const { register, handleSubmit } = useForm()
    const { handleNewUser } = useDataHook();

    const onSubmit = (data) => {
        handleNewUser(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...register('email')}
                placeholder='Email'
                required
            />

            <TextField
                {...register('name')}
                placeholder='name'
                required
            />

            <TextField
                {...register('password')}
                placeholder='password'
                required
            />

            <Button type='submit'>Login</Button>
        </form>
    )
}
