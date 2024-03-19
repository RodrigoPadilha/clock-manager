import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthService) private authService: AuthService
  ) {}

  @Post('/signin')
  signin(
    @Body() {email, password}: SigninDto
  ) {
    return this.authService.signin(email, password);
  }
}
