import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InvalidCredentialsException } from '@exceptions/invalidcredentials.exception';
import { comparePassword } from '../users/entities/user.entity';
import { IAuthPayload } from '@/domain/auth/IAuthPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(JwtService) private jwtService: JwtService
  ) {}

  async signin(email: string, password: string): Promise<IAuthPayload> {
    const user = await this.usersService.findOne({
      where: {
        email
      }
    });
    if(!user || !comparePassword(password, user.password)) throw new InvalidCredentialsException();
    const { password: _, ...result } = user;
    return {
      access_token: this.jwtService.sign(result)
    };
  }
}
