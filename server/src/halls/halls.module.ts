import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HallsController } from './halls.controller.js';
import { HallsService } from './halls.service.js';

@Module({
    imports: [PrismaModule],
    controllers: [HallsController],
    providers: [HallsService],
})

export class HallsModule {}
