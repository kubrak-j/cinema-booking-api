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
