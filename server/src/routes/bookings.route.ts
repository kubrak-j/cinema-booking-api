import { Router } from "express";
import { prisma } from "../prisma.js";
import { Prisma } from '@prisma/client';
import { authenticate } from "../middlewares/auth.middleware.js";
import { postBookingSchema } from "../schemas/bookings.schema.js";
import { generateTicket } from "../utils/ticket.js";
import { priceCalculate } from "../utils/pricing.js";

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

        const existingBooking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { session: true },
        });

        if(existingBooking === null){
            return res.status(404).json({ message: "Booking not found" });
        }

        if (req.user.role !== "ADMIN" && existingBooking.userId !== req.user.userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        res.status(200).json(existingBooking);
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

        const { sessionId, row, number } = parsed.data;

        const session = await prisma.session.findUnique({
            where: { id: sessionId },
            include: { hall: true }
        });

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        const seat = await prisma.seat.findUnique({
            where: {
                row_number_hallId: {
                    row: row,
                    number: number,
                    hallId: session.hallId
                }
            }
        });

        if (!seat) {
            return res.status(404).json({ message: "Seat not found in this hall" });
        }

        const calculatedPrice = priceCalculate(Number(session.basePrice), seat.seatCategory);

        const ticketCode = generateTicket(session.id, session.hall.name, seat.number, seat.row);

        const newBooking = await prisma.booking.create({
            data: {
                ticketCode: ticketCode,
                totalPrice: new Prisma.Decimal(calculatedPrice),
                userId: req.user.userId,
                sessionId: session.id,
                seatId: seat.id,
                status: "PENDING"
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

        const existingBooking = await prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!existingBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (existingBooking.userId !== req.user.userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const deleteBooking = await prisma.booking.delete({ where: { id: bookingId } });

        res.status(200).json(deleteBooking);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router
