import { DeleteOutline } from '@mui/icons-material';
import { Alert, Button, Card, CardActions, CardContent, Divider, Stack, Typography } from '@mui/material';
import { deleteRequest } from '../../api/requestService';
import { CustomTooltip } from '../../components/CustomTooltip';

export const CardRequest = ({ request, getRequest, cantDeleteRequests }) => {
    const {
        code,
        description,
        email,
        subject,
        typeRequest,
    } = request;

    const handleDeleteRequest = async (code) => {
        const res = await deleteRequest(code);
        if (res.status >= 200 || res.status <= 300) {
            await getRequest();
        }

        return <Alert>No se pudo eliminar la solicitud</Alert>
    }

    return (
        <Card>
            <CardContent>
                <Stack gap={1}>
                    <Typography>
                        Tipo de solicitud: {typeRequest === 1 ? "Queja" : "Reclamo"}
                    </Typography>
                    <Typography color='text.secondary'>Correo: {email}</Typography>
                    <Typography variant='body1'>{subject}</Typography>
                    <Typography variant='body1'>{description}</Typography>
                </Stack>
            </CardContent>
            <Divider />
            {cantDeleteRequests ?
                <CardActions onClick={() => handleDeleteRequest(code)}>
                    <Button size='small' startIcon={<DeleteOutline />} color='error'>
                        Eliminar solicitud
                    </Button>
                </CardActions>
                :
                <CustomTooltip message={'No tienes permisos'}>
                    <Button startIcon={<DeleteOutline />} disabled>Eliminar solicitud</Button>
                </CustomTooltip>
            }
        </Card>
    )
}