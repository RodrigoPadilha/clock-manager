import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClockModule } from './clock/clock.module';

@Module({
  imports: [ClockModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
