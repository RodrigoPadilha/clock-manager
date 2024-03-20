import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';
import { CustomRequest } from '@/shared/types/customrequest';

@Controller('reports')
export class RelatorioController {
  constructor(
    private readonly relatorioService: RelatorioService
  ) { }

  @Get()
  async getRecords(
    @Req() req: CustomRequest,
    @Query('minDate') minDate?: string,
    @Query('maxDate') maxDate?: string,
  ) {
    const user = req.user;
    return this.relatorioService.getRecords(user._id, minDate, maxDate);
  }

  @Post()
  async getReportEmail(
    @Req() req: CustomRequest,
  ) { 
    const user = req.user;
    return this.relatorioService.getReportEmail(user._id);
  }
}
