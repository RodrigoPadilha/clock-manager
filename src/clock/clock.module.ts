import { Module } from '@nestjs/common';
import { ClockService } from './clock.service';
import { ClockController } from './clock.controller';

@Module({
  imports: [],
  controllers: [ClockController],
  providers: [ClockService],
})
export class ClockModule {}
