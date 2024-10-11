import { Stack, Typography } from "@mui/material";
import { RegisterForm } from "./form/_RegisterForm";

export const SignUpPage = () => {
    return (
        <Stack
            margin={'auto'}
            gap={5}
            height={'100vh'}
            bgcolor={'#d9eaf8'}
        >
            <Stack
                flexDirection={'row'}
                bgcolor={theme => theme.palette.background.default}
                width={'80%'}
                padding={2}
                boxShadow={'0px 0px 45px -16px #adadad'}
                borderRadius={'35px'}
                alignItems={'center'}
                height={'auto'}
                margin={'auto'}
            >
                <Stack paddingX={3} paddingY={5} width={'50%'} gap={3}>
                    <RegisterForm />
                </Stack>
                <Stack
                    bgcolor={'primary.main'}
                    height={"100%"}
                    borderRadius={'20px'}
                    paddingX={3}
                    width={"50%"}
                    gap={2}
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography variant="h4" textAlign={'center'} fontWeight={500} color="white">Regístrate, crea solicitudes, quejas o reclamos de lo que desees</Typography>
                    <Typography color="white">Crea tu cuenta y escríbenos</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
