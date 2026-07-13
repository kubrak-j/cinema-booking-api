import { Router } from "express";
import { prisma } from "../prisma.js";
import { Prisma } from '@prisma/client';
import { authenticate } from "../middlewares/auth.middleware.js";
import { postBookingSchema } from "../schemas/bookings.schema.js";
import { generateTicket } from "../utils/ticket.js";

const router = Router();

router.get(`/`, authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const allUserBookings = await prisma.booking.findMany({
            where: { userId: req.user.userId },
            include: { session: true },
        });

        if (!allUserBookings) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(allUserBookings);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get(`/:id`, authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const bookingId = Number(req.params.id);

        const foundBooking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { session: true },
        });

        if(foundBooking === null){
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(foundBooking);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post(`/`, authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const parsed = postBookingSchema.safeParse(req.body);
        
        if(!parsed.success){
            return res.status(400).json({ message: parsed.error.issues });
        }

        const newBooking = await prisma.booking.create({
            data: {
                sessionId: parsed.data.sessionId,
                userId: req.user.userId,
                ticket: generateTicket(parsed.data.sessionId, parsed.data.seat),
                seat: parsed.data.seat
            }
        });

        res.status(201).json(newBooking);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(409).json({ message: "Selected seat is already booked" });
            }
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete(`/:id`, authenticate, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const bookingId = Number(req.params.id);

        const foundBooking = await prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!foundBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (foundBooking.userId !== req.user.userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const deleteBooking = await prisma.booking.delete({ where: { id: bookingId } });

        res.status(200).json(deleteBooking);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router