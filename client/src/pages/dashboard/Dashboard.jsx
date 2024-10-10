import { Alert, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllRequests } from '../../api/requestService';
import { CardRequest } from './_CardRequest';
import { AddOutlined } from '@mui/icons-material';
import { DialogCreateRequest } from './_DialogCreateRequest';

export const Dashboard = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    const [isCreateRequest, setIsCreateRequest] = useState(false);

    useEffect(() => {
        getRequests();
    }, []);

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
                    <Typography>Quejas y reclamos</Typography>
                    <Button
                        onClick={() => handleDialogRequest()}
                        variant='contained'
                        startIcon={<AddOutlined />}
                        sx={{ textTransform: 'initial' }}>
                        Crear solicitud
                    </Button>
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
