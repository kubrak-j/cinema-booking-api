import { prisma } from "../../src/prisma.js";
import { resetDatabase } from "./reset.seed.js";
import { seedUsers } from "./seeders/users.seed.js"
import { seedMovies } from "./seeders/movie.seed.js";
import { seedHalls } from "./seeders/hall.seed.js";
import { seedSeats } from "./seeders/seat.seed.js";
import { seedSessions } from "./seeders/session.seed.js";
import { seedBookings } from "./seeders/booking.seed.js";

async function main() {
    try {
        await resetDatabase();

        console.log("\nStarting seeding...\n");
        await seedUsers();
        await seedMovies();
        await seedHalls();
        await seedSeats();
        await seedSessions();
        await seedBookings();

        console.log("\nSeeding finished.");
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
