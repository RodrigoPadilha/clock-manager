import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, hashPassword } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { IUser } from '@/domain/user/IUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async seed() {
    const users = [
      {
        email: 'user1@email.com',
        password: '123'
      },
      {
        email: 'user2@email.com',
        password: '123'
      },
      {
        email: 'user3@email.com',
        password: '123'
      }
    ]
    await this.userRepository.delete({});
    await Promise.all(users.map(async user => {
      user.password = hashPassword(user.password);
      await this.userRepository.save(user);
    }))
    
  }

  async findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOne(query);
  }

  async findAll() {
    return this.userRepository.find();
  }
}
