import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClockService } from './clock.service';

@Controller('v1/clock')
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

  @Get()
  getClocks(): string {
    return this.clockService.clockIn();
  }

  @Post()
  addClock(@Body() body: any): string {
    const { type } = body;

    if (type === 'In') {
      return this.clockService.clockIn();
    }
    return this.clockService.clockOut();
  }
}
