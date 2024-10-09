import { Stack, Typography } from "@mui/material";
import { RegisterForm } from "../Auth/RegisterForm";

export const LoginPage = () => {
    return (
        <Stack
            margin={'auto'}
            gap={5}
            border={'1px solid blue'}
            height={'100vh'}
        >
            <Stack
                flexDirection={'row'}
                width={'80%'}
                gap={10}
                border={'1px solid red'}
                alignItems={'center'}
                height={'90%'}
                margin={'auto'}
            >
                <Stack width={'50%'}>
                    <img
                        width={"100%"}
                        height={"100%"}
                        src="https://media.istockphoto.com/id/1135341047/vector/login-page-on-laptop-screen-notebook-and-online-login-form-sign-in-page-user-profile-access.jpg?s=612x612&w=0&k=20&c=EsJEsevxVZujj_IU_nLz4tZcvmcXTy7sQt03bpfz3ZQ="
                        alt=""
                    />
                </Stack>
                <Stack gap={3}>

                    <Typography variant="h5">Regístrate</Typography>
                    <RegisterForm />
                </Stack>
            </Stack>
        </Stack>
    );
}
