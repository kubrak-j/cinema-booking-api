import { prisma } from "../../src/prisma.js";
import { seedAdmin } from "./admin.seed";
import { seedUser } from "./user.seed";
import { seedMovies } from "./movies.seed";
import { seedSessions } from "./sessions.seed";
import { seedBookings } from "./bookings.seed";

async function runSeedStep(label: string, seedFn: () => Promise<unknown>) {
    console.log(`\n=== ${label} ===`);
    await seedFn();
}

async function main() {
    try {
        console.log("Starting seeding...");

        await runSeedStep("Admin", seedAdmin);
        await runSeedStep("User", seedUser);
        await runSeedStep("Movies", seedMovies);
        await runSeedStep("Sessions", seedSessions);
        await runSeedStep("Bookings", seedBookings);

        console.log("\nSeeding finished.");
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();