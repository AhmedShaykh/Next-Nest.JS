import * as z from "zod";

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email Is Required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 Characters Required"
    }),
    name: z.string().min(1, {
        message: "Name Is Required"
    })
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email Is Required"
    }),
    password: z.string().min(1, {
        message: "Password Is Required"
    }),
    code: z.optional(z.string())
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email Is Required"
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 Characters Required"
    })
});