
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clock } from '../clock/entities/clock.entity';
import { Between, IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import dayjs from '@/shared/libs/dayjs';
import { EmailPort } from '@/shared/ports/IEmail.port';
import { UsersService } from '../users/users.service';

@Injectable()
export class RelatorioService {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @InjectRepository(Clock) private clockRepository: Repository<Clock>,
    @Inject(EmailPort) private emailAdapter: EmailPort,
  ) { }

  getRecords(user_id: number, _maxDate?: string, _minDate?: string) {
    const maxDate = dayjs(_maxDate).endOf('day');
    let minDate = dayjs(_minDate).startOf('day');
    if (!_minDate) minDate = maxDate.subtract(1, 'month').startOf('day');

    return this.clockRepository.find({
      where: [
        {
          user: {
            _id: user_id,
          },
          in: MoreThanOrEqual(minDate.toDate()),
          out: LessThanOrEqual(maxDate.toDate()),
        },
        {
          user: {
            _id: user_id,
          },
          in: MoreThanOrEqual(minDate.toDate()),
          out: IsNull()
        }
      ],
      select: {
        in: true,
        out: true,
        intervals: true
      }
    });
  }

  async getReportEmail(user_id: number) {
    const user = await this.usersService.findOne({
      where: {
        _id: user_id
      }
    });
    const minDate = dayjs().startOf('month').format('YYYY-MM-DD');
    const maxDate = dayjs().endOf('day').format('YYYY-MM-DD');
    const records = await this.getRecords(user_id, maxDate, minDate);
    let total = 0;
    let report = `<html>
    <style>
      table {
        border-collapse: collapse;
      }
      tr,td,th {
        border: 1px solid black;
        padding: 5px;
      }
      thead {
        background-color: #f2f2f2;
      }
    </style>
    <body>
    <table>
      <thead>
        <tr>
          <th>Entrada</th>
          <th>Saída</th>
          <th>Intervalos</th>
          <th>Horas trabalhadas</th>
        </tr>
      </thead>
      <tbody>
        ${records.map(record => {
      let horasTrabalhadas: { hours: number; minutes: number } | undefined = undefined;
      if (!record.out) horasTrabalhadas = undefined;
      else {
        let diff = dayjs(record.out).diff(dayjs(record.in), 'minute');
        if (record.intervals) {
          record.intervals.forEach(interval => {
            const intervalDiff = dayjs(interval.end).diff(dayjs(interval.start), 'minute');
            diff -= intervalDiff;
          })
        }
        total += diff;
        horasTrabalhadas = {
          hours: Math.floor(diff / 60), // Calcula as horas arredondando para baixo
          minutes: diff % 60, // Calcula os minutos restantes
        };
      }
      const intervals = record.intervals?.map(interval => {
        return `<table>
            <tbody>
              <tr>
                <td>${dayjs(interval.start).format('DD/MM/YYYY HH:mm:ss')}</td>
                <td>${interval.end ? dayjs(interval.end).format('DD/MM/YYYY HH:mm:ss') : '-'}</td>
              </tr>
            </tbody>
          </table>`
      }).join('') ?? '-';

      return `<tr>
          <td>${dayjs(record.in).format('DD/MM/YYYY HH:mm:ss')}</td>
          <td>${record.out ? dayjs(record.out).format('DD/MM/YYYY HH:mm:ss') : '-'}</td>
          <td>${intervals}</td>
          <td>${horasTrabalhadas ? `${horasTrabalhadas.hours} horas, ${horasTrabalhadas.minutes} minutos` : '-'}</td>
        </tr>`
    }).join('')}`;

    report += `<tr>
        <td colspan="3">Total de horas trabalhadas</td>
        <td>${Math.floor(total / 60)} horas, ${total % 60} minutos</td>
        </tr>
      </tbody>
    </table>
    </body>
    <html>`

    return this.emailAdapter.sendEmail({
      subject: `Relatório de ponto: ${user?.email}`,
      body: report,
      recipients: ['andre-luiz1997@hotmail.com']
    })
  }
}
