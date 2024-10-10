import { Stack, Typography } from '@mui/material'
import { LoginForm } from './_LoginForm.jsx'

export const LoginPage = () => {
    return (
        <Stack
            position={'relative'}
            sx={{
                backgroundImage: "url(https://i.pinimg.com/originals/5c/37/14/5c3714cba608140b1d6c15ce3f699068.gif)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
            margin={'auto'}
            height={'100vh'}
            bgcolor={'#ededed'}
        >
            <Stack sx={{ position: 'absolute', height: '100%', width: "100%", backgroundColor: '#00000091' }} />
            <Stack
                zIndex={100}
                flexDirection={"column"}
                alignItems={'center'}
                padding={8}
                gap={4}
                bgcolor={theme => theme.palette.background.default}
                width={'50%'}
                boxShadow={'0px 0px 45px -16px #adadad'}
                borderRadius={'30px'}
                margin={'auto'}
            >
                <Stack gap={1} flexDirection={'column'} alignItems={'center'} width={"80%"}>
                    <Typography variant="h4" fontWeight={500}>Iniciar sesión</Typography>
                    <Typography color="text.secondary">Inicia sesión para ver tus solicitudes</Typography>
                </Stack>
                <LoginForm />
            </Stack>
        </Stack>
    )
}
