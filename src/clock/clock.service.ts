import { Injectable } from '@nestjs/common';
import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class ClockService {
  constructor(private readonly appConfiService: AppConfigService) {}
  clockIn(): string {
    console.log('===>', JSON.stringify(this.appConfiService.database, null, 2));
    return 'Clock IN';
  }

  clockOut(): string {
    console.log('===>', JSON.stringify(this.appConfiService.database, null, 2));
    return 'Clock OUT';
  }
}
