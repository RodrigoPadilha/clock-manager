import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ClockService } from './clock.service';
import { CustomRequest } from '@/shared/types/customrequest';
import { ClockTypes } from '@/domain/clock/IClock';

@Controller('clocks')
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

  @Post()
  clock(@Req() req: CustomRequest, @Query('interval') isInterval?: boolean) {
    const user = req.user;
    return this.clockService.clockIn(user._id, isInterval);
  }
}
