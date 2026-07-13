import { prisma } from "../../src/prisma.js";

export async function seedMovies(){
    try {
        console.log(`Seeding movies...`);

        const movieCount = await prisma.movie.count();
        if (movieCount > 0) {
            console.log("Database already has movies. Skipping seed.");
            return;
        }

        const newMovies = await prisma.movie.createManyAndReturn({
            data: [
                {
                    movieName: "Interstellar: Beyond Time",
                    description: "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
                    duration: 169,
                    ageLimit: false
                },
                {
                    movieName: "The Night Hunter",
                    description: "A dark detective thriller tracking the psychological game between a seasoned investigator and a serial killer.",
                    duration: 115,
                    ageLimit: true
                },
                {
                    movieName: "Secret of the Abandoned Planet",
                    description: "An exciting animated sci-fi adventure about a young crew discovering uncharted territories in deep space.",
                    duration: 94,
                    ageLimit: false
                },
                {
                    movieName: "Apocalypse Code",
                    description: "A high-stakes espionage action movie where a former special agent returns to active duty to prevent a global disaster.",
                    duration: 132,
                    ageLimit: true
                }
            ]
        });

        console.log(`✓ Movies seeded successfully: ${newMovies.map(movie => movie.movieName).join(", ")}`);
        return newMovies;
    } catch (error) {
        console.error(error);
    }
}
