import { ModulesModule } from '@modules/modules.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConfigModule } from './infra/config/config.module';
import { buildDatabaseOptions } from './infra/database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './infra/modules/auth/guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(buildDatabaseOptions()),
    AppConfigModule,
    ModulesModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
