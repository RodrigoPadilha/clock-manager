import { Inject, Injectable } from '@nestjs/common';
import { AppConfigModule } from '@/infra/config/config.module';
import { AppConfigService } from '@/infra/config/config.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { InvalidCredentialsException } from '@/infra/exceptions/invalidcredentials.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Clock } from './entities/clock.entity';
import { IsNull, Repository } from 'typeorm';
import dayjs from '@/shared/libs/dayjs';

@Injectable()
export class ClockService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @InjectRepository(Clock) private clockRepository: Repository<Clock>
  ) { }

  async clockIn(user_id: number, isInterval?: boolean) {
    const user = await this.usersService.findOne({
      where: {
        _id: user_id
      }
    });
    if (!user) throw new InvalidCredentialsException();
    const clock = await this.getOpenClock(user);
    if (!clock) return this.createClock(user);
    if(isInterval) {
      if(!clock.intervals) clock.intervals = [];
      const openInterval = clock.intervals?.find(interval => !interval.end);
      if(!openInterval) {
        clock.intervals.push({
          start: dayjs().toDate()
        });
      } else {
        openInterval.end = dayjs().toDate();
      }
      return this.clockRepository.save(clock);
    }
    clock.out = dayjs().toDate();
    return this.clockRepository.save(clock);
  }

  async createClock(user: User, isInterval?: boolean) {
    const clock = this.clockRepository.create({
      user,
      in: dayjs().toDate(),
    });
    return this.clockRepository.save(clock)
  }

  private getOpenClock(user: User) {
    return this.clockRepository.findOne({
      where: {
        user,
        out: IsNull()
      }
    });
  }
}
