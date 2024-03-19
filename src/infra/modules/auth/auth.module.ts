import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '3600s' }
        })
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService
    ],
})
export class AuthModule { }
