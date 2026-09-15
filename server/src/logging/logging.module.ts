import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import type { Request, Response } from 'express';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProd = configService.get('NODE_ENV') === 'production';

        return {
          pinoHttp: {
            level: isProd ? 'info' : 'debug',
            redact: ['req.headers.authorization', 'req.headers.cookie'],
            serializers: {
              req: (req: Request) => ({ method: req.method, url: req.url }),
              res: (res: Response) => ({ statusCode: res.statusCode }),
            },
            ...(!isProd && {
              transport: { target: 'pino-pretty', options: { singleLine: true } },
            }),
          },
        };
      },
    }),
  ],
})
export class AppLoggingModule {}
