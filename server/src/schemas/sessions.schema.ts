import * as z from "zod";
import { SessionStatus } from "@prisma/client";

export const postSessionSchema = z.object({
    startTime: z.coerce.date(),
    movieId: z.number(),
    hallId: z.number(),
    status: z.nativeEnum(SessionStatus),
    basePrice: z.number()
});

export const patchSessionSchema = z.object({
    startTime: z.coerce.date(),
    movieId: z.number(),
    hallId: z.number(),
    status: z.nativeEnum(SessionStatus),
    basePrice: z.number()
}).partial();