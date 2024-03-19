import { Injectable } from '@nestjs/common';

@Injectable()
export class ClockService {
  clockIn(): string {
    return 'Clock IN';
  }

  clockOut(): string {
    return 'Clock OUT';
  }
}
