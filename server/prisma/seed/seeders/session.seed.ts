import { prisma } from "../../../src/prisma.js";
import { sessionsConfig } from "../seeders-config/sessions.config.js";

export async function seedSessions(){
    try {
        for (const config of sessionsConfig) {
            const movie = await prisma.movie.findFirst({ where: { title: config.movie } });
            if (!movie) {
                console.log(`Movie "${config.movie}" not found for session, skipping.`);
                continue;
            }

            const hall = await prisma.hall.findUnique({ where: { name: config.hall } });
            if (!hall) {
                console.log(`Hall "${config.hall}" not found for session, skipping.`);
                continue;
            }

            const existingSession = await prisma.session.findFirst({
                where: {
                    startTime: config.startTime,
                    movieId: movie.id,
                    hallId: hall.id,
                    status: config.status,
                    basePrice: config.basePrice
                }
            });

            if (existingSession) {
                console.log(`Session for "${config.movie}" already exists, skipping.`);
                continue;
            }

            const newSession = await prisma.session.create({
                data: {
                    startTime: config.startTime,
                    movieId: movie.id,
                    hallId: hall.id,
                    status: config.status,
                    basePrice: config.basePrice
                }
            });

            console.log(`✓ Created session for "${movie.title}" in "${hall.name}" hall.`);
        }

    } catch (error) {
        console.error(error);
    }
}
