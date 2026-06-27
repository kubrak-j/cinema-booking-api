import * as z from "zod";

export const postSessionSchema = z.object({
    date: z.coerce.date(),
    movieId: z.number(),
    isActive: z.boolean(),
});

export const patchSessionSchema = z.object({
    date: z.coerce.date(),
    movieId: z.number(),
    isActive: z.boolean(),
}).partial();