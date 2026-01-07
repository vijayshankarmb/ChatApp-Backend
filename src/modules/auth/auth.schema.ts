import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, "username must be at least 3 character"),
    email: z.email("invalid email"),
    password: z.string().min(6, "password must be at least 6 character")
})

export const loginSchema = z.object({
    email: z.email("invalid email"),
    password: z.string().min(6, "password must be at least 6 character")
})

export type Register = z.infer<typeof registerSchema>;
export type Login = z.infer<typeof loginSchema>;