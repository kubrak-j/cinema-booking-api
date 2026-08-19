import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module.js';
import { SessionsModule } from "./sessions/sessions.module.js";
import { HallsModule } from './halls/halls.module.js';
import { SeatsModule } from './seats/seats.module.js';

@Module({
    imports: [MoviesModule, SessionsModule, HallsModule, SeatsModule],
    controllers: [],
    providers: [],
})

export class AppModule {}
