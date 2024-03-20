import { Injectable } from '@nestjs/common';
import { AppConfigModule } from '@/infra/config/config.module';
import { AppConfigService } from '@/infra/config/config.service';

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
