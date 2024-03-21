import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';

export function buildDatabaseOptions(): TypeOrmModuleAsyncOptions {
  return {
    imports: [AppConfigModule],
    inject: [AppConfigService],
    useFactory: async (appConfigService: AppConfigService) => {
      const { type, host, port, username, password, name } =
        appConfigService.database;
      console.log(appConfigService.database)

      return {
        type: type as any,
        host,
        port,
        username,
        password,
        database: name,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false
          },
        },
      };
    },
  };
}
