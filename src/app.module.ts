import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClockModule } from './clock/clock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    /* TypeOrmModule.forRoot({ ... }), */
    //DatabaseModule,
    AppConfigModule,
    ClockModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
