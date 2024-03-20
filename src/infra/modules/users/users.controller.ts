import { Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RecordNotFoundException } from '@exceptions/recordnotfound.exception';
import { Public } from '@/shared/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private userService: UsersService
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(
    @Param('id') _id: number
  ) {
    const user =  this.userService.findOne({
      where: {
        _id
      }
    });
    if(user) return user;
    throw new RecordNotFoundException();
  }

  @Post('/seed')
  @Public()
  seed() {
    return this.userService.seed();
  }
}
