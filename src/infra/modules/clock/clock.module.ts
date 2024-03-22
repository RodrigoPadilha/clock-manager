import { Module, forwardRef } from '@nestjs/common';
import { ClockService } from './clock.service';
import { ClockController } from './clock.controller';
import { AppConfigModule } from '@/infra/config/config.module';
import { UsersModule } from '../users/users.module';
import { Clock } from './entities/clock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AppConfigModule,
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Clock])
  ],
  controllers: [ClockController],
  providers: [ClockService],
})
export class ClockModule { }
