import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module.js';

@Module({
    imports: [MoviesModule],
    controllers: [],
    providers: [],
})

export class AppModule {}
