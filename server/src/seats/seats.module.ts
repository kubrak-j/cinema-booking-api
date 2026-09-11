import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { SeatsController } from './seats.controller.js';
import { SeatsService } from './seats.service.js';

@Module({
    imports: [PrismaModule],
    controllers: [SeatsController],
    providers: [SeatsService],
})

export class SeatsModule {}
