import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module.js';
import { AppLoggingModule } from './logging/logging.module.js';
import { MoviesModule } from './movies/movies.module.js';
import { SessionsModule } from './sessions/sessions.module.js';
import { HallsModule } from './halls/halls.module.js';
import { SeatsModule } from './seats/seats.module.js';
import { AuthModule } from './auth/auth.module.js';
import { BookingsModule } from './bookings/bookings.module.js';

@Module({
  imports: [
    AppConfigModule,
    AppLoggingModule,
    MoviesModule,
    SessionsModule,
    HallsModule,
    SeatsModule,
    AuthModule,
    BookingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
