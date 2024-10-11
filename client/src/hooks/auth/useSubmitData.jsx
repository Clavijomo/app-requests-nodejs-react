import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerRequestSchema } from '../../validations/request.js'
import { createRequest } from "../../api/requestService.js";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";

export const useSubmitData = (handleDialogRequest, getRequests) => {
    const [responseExit, setResponseExit] = useState(false);
    const { handleSubmit, register, getValues, formState: { errors, isValid }, control, } = useForm({
        resolver: zodResolver(registerRequestSchema),
        defaultValues: {
            typeRequest: 1
        }
    })

    const onSubmit = async (data) => {
        const typeRequest = Number(getValues('typeRequest'));
        data.email = localStorage.getItem("email")
        const response = await createRequest({ ...data, typeRequest });

        if (response.status >= 200 || response.status <= 300) {
            setResponseExit(true);
            handleDialogRequest();
            getRequests();
            return
        }

        return <Alert severity="error">Hubo un error</Alert>
    };


    return {
        onSubmit,
        handleSubmit,
        register,
        errors,
        responseExit,
        isValid,
        control
    }
}