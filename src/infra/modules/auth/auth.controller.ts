import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { Public } from '@/shared/decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthService) private authService: AuthService
  ) {}

  @Post('/signin')
  @Public()
  signin(
    @Body() {email, password}: SigninDto
  ) {
    return this.authService.signin(email, password);
  }
}
