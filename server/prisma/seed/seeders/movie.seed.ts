import { prisma } from "../../../src/prisma.js";
import { moviesConfig } from "../seeders-config/movies.config.js";

export async function seedMovies(){
    try {
        for(const config of moviesConfig){
            
            const existingMovie = await prisma.movie.findFirst({
                where: {
                    title: config.title,
                    description: config.description,
                    duration: config.duration,
                    ageRating: config.ageRating
                }
            });
            
            if (existingMovie) {
                console.log(`Movie "${config.title}" already exists, skipping.`);
                continue;
            }

            const newMovie = await prisma.movie.create({
                data: {
                    title: config.title,
                    description: config.description,
                    duration: config.duration,
                    ageRating: config.ageRating
                }
            });
            
            console.log(`✓ Created movie "${newMovie.title}".`);
        }

    } catch (error) {
        console.error(error);
    }
}
