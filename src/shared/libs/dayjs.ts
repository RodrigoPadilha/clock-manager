import * as dayjs from 'dayjs';
import dayjsPtBR from 'dayjs/locale/pt-br';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.locale({
  ...dayjsPtBR,
  weekStart: 0
});
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo');

export default dayjs;