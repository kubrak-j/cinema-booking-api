import * as z from "zod";

export const postMovieSchema = z.object({
    movieName: z.string(),
    description: z.string(),
    duration: z.number(),
    ageLimit: z.boolean(),
});

export const patchMovieSchema = z.object({
    movieName: z.string(),
    description: z.string(),
    duration: z.number(),
    ageLimit: z.boolean(),
}).partial();