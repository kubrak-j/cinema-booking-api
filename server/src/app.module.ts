import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module.js';
import { SessionsModule } from "./sessions/sessions.module.js";

@Module({
    imports: [MoviesModule, SessionsModule],
    controllers: [],
    providers: [],
})

export class AppModule {}
