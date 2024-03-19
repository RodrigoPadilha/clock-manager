import { ModulesModule } from '@modules/modules.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConfigModule } from './infra/config/config.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    /* TypeOrmModule.forRoot({ ... }), */
    AppConfigModule,
    DatabaseModule,
    ModulesModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
