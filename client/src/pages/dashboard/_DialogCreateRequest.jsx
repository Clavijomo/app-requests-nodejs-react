import { CloseOutlined } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from '@mui/material'
import { FormCreateRequest } from './_FormCreateRequest'

export const DialogCreateRequest = ({ handleDialogRequest, getRequests }) => {
    return (
        <Dialog open maxWidth={'md'} fullWidth>
            <DialogTitle>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack>
                        <Typography variant='h5'>Crear una nueva solicitud</Typography>
                        <Typography
                            color='text.secondary'
                            variant='body1'>Crea una nueva solicitud. Te leemos</Typography>
                    </Stack>
                    <IconButton onClick={handleDialogRequest}>
                        <CloseOutlined />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <FormCreateRequest
                    getRequests={getRequests}
                    handleDialogRequest={handleDialogRequest}
                />
            </DialogContent>
            <Divider />
        </Dialog>
    )
}
