import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({ message: "El nombre debe ser un string" })
        .min(1, { message: "El nombre es obligatorio" })
        .min(3, { message: "El nombre debe contener al menos 3 caracteres" }),
    email: z.string()
        .min(1, { message: "El correo es obligatorio" })
        .email({ message: "Correo inválido" }),
    password: z.string()
        .min(1, { message: "La contraseña es obligatoria" })
        .min(6, { message: "La contraseña debe contener al menos 6 caracteres" }),
    role: z.enum(['1', '2'], { message: "El campo es requerido" })
});

export const loginSchema = z.object({
    email: z.string()
        .min(1, { message: "El correo es requerido" })
        .email({ message: "Correo inválido" }),
    password: z.string()
        .min(1, { message: "La contraseña es requerida" })
        .min(6, { message: "La contraseña debe ser de al menos 6 caracteres" })
});