import * as z from "zod";

export const authSchema = z.object({
    name: z.string(),
    login: z.string(),
    email: z.string().trim().email({ message: `Incorrect email format` }),
    password: z.string(),
});

export const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string(),
});