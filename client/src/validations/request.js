import { z } from "zod";

export const registerRequestSchema = z.object({
    email: z.string()
        .min(1, { message: "El correo es obligatorio" })
        .email({ message: "Correo inválido" }),
    description: z.string({ message: "La descripción debe ser texto" })
        .min(1, { message: "La descripción es obligatoria " })
        .min(10, { message: "El nombre debe contener al menos 3 caracteres" }),
    subject: z.string({ message: "El asunto es requerido" })
        .min(1, { message: "El asunto es requerido" })
        .min(7, { message: "El asunto debe contener al menos 7 caracteres" }),
});