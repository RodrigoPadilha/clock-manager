import { RelatorioService } from './relatorio.service';
import { RelatorioController } from './relatorio.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        RelatorioController
    ],
    providers: [
        RelatorioService
    ],
})
export class RelatorioModule { }
