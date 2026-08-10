import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { SessionsController } from './sessions.controller.js';
import { SessionsService } from './sessions.service.js';

@Module({
    imports: [PrismaModule],
    controllers: [SessionsController],
    providers: [SessionsService],
})

export class SessionsModule {}
