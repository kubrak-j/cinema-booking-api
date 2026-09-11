import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller.js';
import { MoviesService } from './movies.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
    imports: [PrismaModule],
    controllers: [MoviesController],
    providers: [MoviesService],
})

export class MoviesModule {}
