import * as z from "zod";
import { AgeRating } from "@prisma/client";

export const postMovieSchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),
    ageRating: z.nativeEnum(AgeRating)
});

export const patchMovieSchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),
    ageRating: z.nativeEnum(AgeRating)
}).partial();