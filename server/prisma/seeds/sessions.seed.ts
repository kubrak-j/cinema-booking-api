import { prisma } from "../../src/prisma.js";

export async function seedSessions(){
    try {
        console.log(`Sedding sessions...`);

        const sessionCount = await prisma.session.count();
        if (sessionCount > 0){
            console.log("Database already has sessions. Skipping seed.");
            return;
        }

        console.log(`Seeding sessions...`);

        const movies = await prisma.movie.findMany({
            select: { id: true },
            orderBy: { id: 'asc' },
            take: 4,
        });

        if (movies.length === 0) {
            console.log("No movies found. Skipping session seed.");
            return;
        }

        const newSessions = await prisma.session.createManyAndReturn({
            data: [
                {
                    date: new Date('2026-07-20T10:00:00Z'),
                    movieId: movies[0]!.id,
                    isActive: true
                },
                {
                    date: new Date('2026-07-20T14:30:00Z'),
                    movieId: movies[0]!.id,
                    isActive: true
                },
                {
                    date: new Date('2026-07-20T19:00:00Z'),
                    movieId: movies[1]!.id,
                    isActive: true
                },
                {
                    date: new Date('2026-07-20T23:30:00Z'),
                    movieId: movies[1]!.id,
                    isActive: true
                },
                {
                    date: new Date('2026-07-21T11:00:00Z'),
                    movieId: movies[2]!.id,
                    isActive: true
                },
                {
                    date: new Date('2025-12-01T18:00:00Z'),
                    movieId: movies[3]!.id,
                    isActive: false
                }
            ]
        });

        console.log(`✓ ${newSessions.length} sessions were successfully seeded`);
    } catch (error) {
        console.error(error);
    }
}