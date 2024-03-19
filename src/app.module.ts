import { ModulesModule } from '@modules/modules.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConfigModule } from './infra/config/config.module';
import { DatabaseModule } from './infra/database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './infra/modules/auth/guards/auth.guard';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    ModulesModule,
  ],
  controllers: [],
  providers: [
    AppService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }],
})
export class AppModule { }
