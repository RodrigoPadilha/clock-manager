
import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailConfigMismatchException extends HttpException {
  constructor() {
    super('EmailConfigMismatch', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
