import { Controller, ParseBoolPipe, Post, Query, Req } from '@nestjs/common';
import { ClockService } from './clock.service';
import { CustomRequest } from '@/shared/types/customrequest';

@Controller('clocks')
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

  @Post()
  clock(@Req() req: CustomRequest, @Query('interval', ParseBoolPipe) isInterval?: boolean) {
    const user = req.user;
    return this.clockService.clockIn(user._id, isInterval);
  }
}
