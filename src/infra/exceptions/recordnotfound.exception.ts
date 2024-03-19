import { HttpException, HttpStatus } from '@nestjs/common';

export class RecordNotFoundException extends HttpException {
  constructor() {
    super('RecordNotFound', HttpStatus.NOT_ACCEPTABLE);
  }
}
