import { prisma } from "../../src/prisma.js";

export async function resetDatabase() {
    try {
        console.log("\nStarting full database cleanup...\n");

        console.log("Clearing Bookings table...");
        await prisma.booking.deleteMany({}); 

        console.log("Clearing Session table..");
        await prisma.session.deleteMany({}); 

        console.log("Clearing Seat table..");
        await prisma.seat.deleteMany({}); 

        console.log("Clearing Movie table..");
        await prisma.movie.deleteMany({}); 

        console.log("Clearing Hall table..");
        await prisma.hall.deleteMany({}); 

        console.log("Clearing User table..");
        await prisma.user.deleteMany({}); 

        console.log("\nDatabase has been successfully and completely cleared.");
    } catch (error) {
        console.error(error);
        throw error;
    }
}