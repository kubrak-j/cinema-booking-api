import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(7000),
    DATABASE_URL: z.string().trim().min(1).url(),
    JWT_SECRET: z.string().trim().min(10),
    TICKET_SECRET: z.string().trim().min(16),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
    console.error("Environment variable validation error:");
    console.error(envParsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = envParsed.data;