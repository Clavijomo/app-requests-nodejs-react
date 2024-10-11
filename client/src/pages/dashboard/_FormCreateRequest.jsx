import { AddOutlined } from "@mui/icons-material";
import { Alert, Button, FormControl, FormControlLabel, FormLabel, OutlinedInput, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { CustomTooltip } from "../../components/CustomTooltip";
import { useSubmitData } from "../../hooks/auth/useSubmitData";

export const FormCreateRequest = ({ handleDialogRequest, getRequests }) => {
    const {
        control,
        errors,
        isValid,
        responseExit,
        handleSubmit,
        onSubmit,
        register,
    } = useSubmitData(
        getRequests,
        handleDialogRequest
    );

    return (
        <Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={3}>
                    <FormControl sx={{ gap: 2 }}>
                        <FormLabel>Elige el tipo de solicitud</FormLabel>
                        <Controller
                            {...register('typeRequest')}
                            control={control}
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <Stack direction={'row'} justifyContent={'space-evenly'} gap={2}>
                                        <Stack width={'50%'} border={'1px solid #ededed'} padding={1} borderRadius={'20px'}>
                                            <FormControlLabel value={'1'} control={<Radio />} label="Queja" />
                                        </Stack>
                                        <Stack width={'50%'} border={'1px solid #ededed'} padding={1} borderRadius={'20px'}>
                                            <FormControlLabel value={'2'} control={<Radio />} label="Reclamo" />
                                        </Stack>
                                    </Stack>
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                    <CustomTooltip>
                        <OutlinedInput
                            placeholder="Asunto"
                            sx={{
                                borderRadius: 20,
                                border: errors?.subject && '1px solid red'
                            }}
                            {...register('subject')}
                        />
                    </CustomTooltip>
                    <CustomTooltip>
                        <TextField
                            multiline
                            rows={8}
                            maxRows={5}
                            slotProps={{
                                input: {
                                    sx: {
                                        border: errors?.description && '1px solid red'
                                    }
                                }
                            }}
                            placeholder="Descripción"
                            {...register('description')}
                        />
                    </CustomTooltip>
                </Stack>
                <Stack marginY={2} marginX={'auto'} direction={'row'} justifyContent={responseExit ? 'space-between' : 'flex-end'}>
                    {responseExit &&
                        <Alert severity="success">La solicitud se creó exitosamente</Alert>
                    }
                    <Button
                        disabled={!isValid}
                        type="submit"
                        variant='contained'
                        startIcon={<AddOutlined />}
                        sx={{ textTransform: 'initial', width: 'max-content' }}>
                        {responseExit ? "Solicitud creada" : "Crear solicitud"}
                    </Button>
                </Stack>
            </form>
        </Stack>
    )
}
