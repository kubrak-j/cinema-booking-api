import express from "express";
import { prisma } from './prisma.js';
import { Prisma } from '@prisma/client';

const app = express();
app.use(express.json());
const port = 7000;

app.listen(port, () => {
    console.log(`The server is running`);
    console.log(`listening on port ${port}`);
});

app.get(`/movies`, async (req, res) => {
    try {
        const allMovies = await prisma.movie.findMany();
        res.json(allMovies);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get(`/movies/:id`, async (req, res) => {
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

app.get(`/sessions`, async (req, res) => {
    try {
        const allSessions = await prisma.session.findMany();
        res.json(allSessions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
});

app.get(`/sessions/:id`, async (req, res) => {
    try {
        const sessionId = Number(req.params.id);
        const foundSession = await prisma.session.findUnique({
            where: { id: sessionId }
        });
        if(foundSession === null){
            return res.status(404).json({ message: "Session not found" });
        }
        res.json(foundSession);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post(`/movies`, async (req, res) => {
    try {
        const newMovie = await prisma.movie.create({
            data: {
                movieName: req.body.movieName,
                description: req.body.description,
                duration: req.body.duration,
                ageLimit: req.body.ageLimit
            }
        });
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post(`/sessions`, async (req, res) => {
    try {
        const newSession = await prisma.session.create({
            data: {
                date: req.body.date,
                movieId: req.body.movieId,
                isActive: req.body.isActive,
                bookings: req.body.bookings
            }
        });
        res.status(201).json(newSession);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.patch(`/movies/:id`, async (req, res) => {
    try {
        const movieId = Number(req.params.id);
        const patchedMovie = await prisma.movie.update({
            where: { id: movieId },
            data: req.body
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

app.patch(`/sessions/:id`, async (req, res) => {
    try {
        const sessionId = Number(req.params.id);
        const patchedSession = await prisma.session.update({
            where: { id: sessionId },
            data: req.body
        });
        res.json(patchedSession);
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === `P2025`) {
                return res.status(404).json({ message: "Session not found" });
            }
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete(`/movies/:id`, async (req, res) => {
    try {
        const movieId = Number(req.params.id);
        const deletedMovie = await prisma.movie.delete({
            where: { 
                id: movieId
            },
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

app.delete(`/sessions/:id`, async (req, res) => {
    try {
        const sessionId = Number(req.params.id);
        const deletedSession = await prisma.movie.delete({
            where: { 
                id: sessionId
            },
        });
        res.json(deletedSession);
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === `P2025`) {
                return res.status(404).json({ message: "Session not found" });
            }
        }
        res.status(500).json({ message: "Internal server error" });
    }
});