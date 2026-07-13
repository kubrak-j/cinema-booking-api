import { prisma } from "../../src/prisma.js";
import { generateTicket } from "../../src/utils/ticket.js";

export async function seedBookings(){
    try {
        console.log(`Sedding bookings...`)

        const bookingCount = await prisma.booking.count();
        if(bookingCount > 0){
            console.log("Database already has bookings. Skipping seed.");
            return;
        }

        const regularUser = await prisma.user.findFirst({
            where: { login: "testUser" },
            select: { id: true },
        });

        const adminUser = await prisma.user.findFirst({
            where: { login: "testAdmin" },
            select: { id: true },
        });

        const sessions = await prisma.session.findMany({
            select: { id: true },
            orderBy: { id: 'asc' },
            take: 3,
        });

        if (!regularUser || !adminUser || sessions.length < 2) {
            console.log("Required users or sessions are missing. Skipping booking seed.");
            return;
        }

        const newBookings = await prisma.booking.createManyAndReturn({
            data: [
                {
                    sessionId: sessions[0]!.id,
                    userId: regularUser.id,
                    ticket: "TICKET-7b2a4c1f",
                    seat: 15,
                    isValidTicket: true
                },
                {
                    sessionId: sessions[0]!.id,
                    userId: adminUser.id,
                    ticket: "TICKET-e0d9a8f7",
                    seat: 16,
                    isValidTicket: true
                },
                {
                    sessionId: sessions[1]!.id,
                    userId: regularUser.id,
                    ticket: "TICKET-3c4b5a6d",
                    seat: 15,
                    isValidTicket: true
                },
                {
                    sessionId: sessions[2]!.id,
                    userId: adminUser.id,
                    ticket: "TIC-9999-0000",
                    seat: 43,
                    isValidTicket: false
                }
            ]
        });

        console.log(`✓ ${newBookings.length} bookings were seeded successfully`)
    } catch (error) {
        console.error(error);
    }
}