import { RelatorioService } from './relatorio.service';
import { RelatorioController } from './relatorio.controller';
import { Module, forwardRef } from '@nestjs/common';
import { AppConfigModule } from '@/infra/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clock } from '../clock/entities/clock.entity';
import { EmailPort } from '@shared/ports/IEmail.port';
import { NodemailerAdapter } from '@shared/adapters/nodemailer.adapter';
import { UsersModule } from '../users/users.module';

export const EmailAdapterProvider = {
    provide: EmailPort,
    useFactory: () => new NodemailerAdapter()
  };

@Module({
    imports: [
        AppConfigModule,
        TypeOrmModule.forFeature([Clock]),
        forwardRef(() => UsersModule)
    ],
    controllers: [
        RelatorioController
    ],
    providers: [
        RelatorioService,
        EmailAdapterProvider
    ],
})
export class RelatorioModule { }
