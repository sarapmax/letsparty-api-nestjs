import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { INTERNAL_SERVER_ERROR_MSG } from '../constants';

@Catch()
export class ExceptionsHandlerFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public catch(exception: any, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res: Response = ctx.getResponse();

    // setup status and error message
    let status: number;
    let message: string;
    let info: unknown = undefined;

    if (exception.inner) {
      status = exception.inner.status;
      message = exception.inner.message;
    } else if (exception.code) {
      status = exception.code;
      message = exception.message.split(': ')[1];
    } else if (exception.status) {
      status = exception.status;
      message = exception.message;
      if (exception.response) {
        info = exception.response.info;
      }
    } else if (exception._message) {
      status = HttpStatus.BAD_REQUEST,
      message = exception._message;
      info = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = INTERNAL_SERVER_ERROR_MSG;
    }

    res.status(status).json({
      status_code: status,
      message,
      info,
    });
  }
}
