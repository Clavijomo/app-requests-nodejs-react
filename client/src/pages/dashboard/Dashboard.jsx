import { AddOutlined } from '@mui/icons-material';
import { Alert, Avatar, Button, Stack, Typography } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getRoleFromToken } from '../../helpers/getRoleFromToken';
import { getAllRequests } from '../../api/requestService';
import { useDataHook } from '../../context/AuthContext';
import { AuthUserPath } from '../../routes/auth';
import { CardRequest } from './_CardRequest';
import { DialogCreateRequest } from './_DialogCreateRequest';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    const [isCreateRequest, setIsCreateRequest] = useState(false);
    const [role, setRole] = useState(null);

    const { handleLogout } = useDataHook()

    useEffect(() => {
        getRequests();
    }, []);

    useEffect(() => {
        isAdmin();
    }, []);

    const handleDeleteToken = () => {
        handleLogout();
        navigate(AuthUserPath.login);
    }

    const cantDeleteRequests = role === 1;

    const isAdmin = async () => {
        await getRoleFromToken(localStorage.getItem('token'));
        const role = localStorage.getItem('role')
        if (role) return setRole(Number(role));

        return Navigate(AuthUserPath.login);
    }

    const getRequests = async () => {
        const { data } = await getAllRequests();
        if (data) {
            return setRequests(data);
        }

        setError('Hubo un error')
        setRequests([]);
    }

    const handleDialogRequest = () => {
        setIsCreateRequest(!isCreateRequest);
    }

    return (
        <>
            <Stack width={"80%"} margin={'50px auto'} gap={3}>
                {error && <Alert severity='error'>{error}</Alert>}
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'} gap={3}>
                        <Typography>Quejas y reclamos</Typography>
                        <Button
                            onClick={() => handleDialogRequest()}
                            disabled={!cantDeleteRequests}
                            variant='contained'
                            startIcon={<AddOutlined />}
                            sx={{ textTransform: 'initial' }}>
                            {cantDeleteRequests ? "Crear solicitud" : "No tienes permisos de administrador"}
                        </Button>
                    </Stack>
                    <Stack direction={'column'} alignItems={'center'} gap={1}>
                        <Avatar
                            sx={{
                                bgcolor: cantDeleteRequests ? deepOrange[500] : deepPurple[500]
                            }}>
                            {cantDeleteRequests ? 'A' : "E"}
                        </Avatar>
                        <Button
                            sx={{ textTransform: 'initial' }}
                            onClick={handleDeleteToken}
                            color='error'
                            variant='outlined'
                            size='small'
                        >
                            Cerrar sesión
                        </Button>
                    </Stack>
                </Stack>
                <Stack
                    display={'grid'}
                    gridTemplateColumns={'repeat(3, 1fr)'}
                    alignItems={'center'}
                    gap={3}
                >
                    {requests.length > 0 &&
                        requests.map((req, i) => (
                            <CardRequest
                                cantDeleteRequests={cantDeleteRequests}
                                key={i}
                                getRequest={getRequests}
                                request={req}
                            />
                        ))
                    }
                </Stack>
            </Stack>
            {isCreateRequest &&
                <DialogCreateRequest
                    getRequests={getRequests}
                    handleDialogRequest={handleDialogRequest}
                />
            }
        </>
    )
}
