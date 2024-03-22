import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from './config.interface';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get database(): IDatabaseConfig {
    return {
      host: this.configService.get<string>('database.host') || '',
      name: this.configService.get<string>('database.name') || '',
      port: this.configService.get<number>('database.port') || 5432,
      username: this.configService.get<string>('database.username') || '',
      password: this.configService.get<string>('database.password') || '',
      type: this.configService.get<string>('database.type') || '',
    };
  }
}
