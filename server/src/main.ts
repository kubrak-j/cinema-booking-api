import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter.js';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalFilters(new PrismaExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Server started on port ${port}`);
}

bootstrap();
