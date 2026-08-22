import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module.js';
import { SessionsModule } from "./sessions/sessions.module.js";
import { HallsModule } from './halls/halls.module.js';
import { SeatsModule } from './seats/seats.module.js';
import { AuthModule } from "./auth/auth.module.js";

@Module({
    imports: [
        MoviesModule,
        SessionsModule,
        HallsModule,
        SeatsModule,
        AuthModule
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
