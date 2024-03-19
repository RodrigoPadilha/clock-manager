import { Module } from '@nestjs/common';
import { ClockModule } from './clock/clock.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ClockModule,
        UsersModule,
        AuthModule
    ],
    controllers: [],
    providers: [],
})
export class ModulesModule {}
