import { Router } from "express";
import { prisma } from "../prisma.js";
import { Prisma } from '@prisma/client';
import * as z from "zod";

const router = Router();

const postMovieSchema = z.object({
    movieName: z.string(),
    description: z.string(),
    duration: z.number(),
    ageLimit: z.boolean(),
});

const patchMovieSchema = z.object({
    movieName: z.string(),
    description: z.string(),
    duration: z.number(),
    ageLimit: z.boolean(),
}).partial();

router.get(`/`, async (req, res) => {
    try {
        const allMovies = await prisma.movie.findMany();
        res.json(allMovies);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const movieId = Number(req.params.id);
        const foundMovie = await prisma.movie.findUnique({
            where: { id: movieId }
        });
        if(foundMovie === null){
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json(foundMovie);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post(`/`, async (req, res) => {
    try {
        const parsed = postMovieSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({ message: parsed.error.issues });
        }

        const newMovie = await prisma.movie.create({
            data: {
                movieName: parsed.data.movieName,
                description: parsed.data.description,
                duration: parsed.data.duration,
                ageLimit: parsed.data.ageLimit
            }
        });

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.patch(`/:id`, async (req, res) => {
    try {
        const movieId = Number(req.params.id);
        const parsed = patchMovieSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({ message: parsed.error.issues });
        }

        const updateData = Object.fromEntries(
            Object.entries(parsed.data).filter(([_, value]) => value !== undefined ),
        );

        const patchedMovie = await prisma.movie.update({
            where: { id: movieId },
            data: updateData
        });

        res.json(patchedMovie);
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === `P2025`) {
                return res.status(404).json({ message: "Movie not found" });
            }
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete(`/:id`, async (req, res) => {
    try {
        const movieId = Number(req.params.id);
        const deletedMovie = await prisma.movie.delete({
            where: { id: movieId },
        });
        res.json(deletedMovie);
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === `P2025`) {
                return res.status(404).json({ message: "Movie not found" });
            }
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;