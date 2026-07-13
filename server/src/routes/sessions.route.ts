import { Router } from "express";
import { prisma } from "../prisma.js";
import { Prisma } from '@prisma/client';
import { postSessionSchema, patchSessionSchema } from "../schemas/sessions.schema.js";
import { authenticate, requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(`/`, async (req, res) => {
    try {
        const allSessions = await prisma.session.findMany({
            include: { movie: true }
        }
        );
        res.json(allSessions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const sessionId = Number(req.params.id);
        const foundSession = await prisma.session.findUnique({
            where: { id: sessionId },
            include: { movie: true },
        });
        if(foundSession === null){
            return res.status(404).json({ message: "Session not found" });
        }
        res.json(foundSession);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post(`/`, authenticate, requireAdmin, async (req, res) => {
    try {
        const parsed = postSessionSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({ message: parsed.error.issues });
        }

        const newSession = await prisma.session.create({
            data: {
                date: parsed.data.date,
                movieId: parsed.data.movieId,
                isActive: parsed.data.isActive,
            }
        });

        res.status(201).json(newSession);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.patch(`/:id`, authenticate, requireAdmin, async (req, res) => {
    try {
        const sessionId = Number(req.params.id);
        const parsed = patchSessionSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({ message: parsed.error.issues });
        }

        const updateData = Object.fromEntries(
            Object.entries(parsed.data).filter(([_, value]) => value !== undefined ),
        );

        const patchedSession = await prisma.session.update({
            where: { id: sessionId },
            data: updateData
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

router.delete(`/:id`, authenticate, requireAdmin, async (req, res) => {
    try {
        const sessionId = Number(req.params.id);
        const deletedSession = await prisma.session.delete({
            where: { id: sessionId },
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

export default router;