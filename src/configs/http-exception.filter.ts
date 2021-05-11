import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { HttpLogTypeEnum, INTERNAL_SERVER_ERROR_MSG, VALIDATION_FAILED } from 'src/constants';
import { HttpLogsService } from 'src/modules/http-logs/http-logs.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpLogsService: HttpLogsService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async catch(exception: any, host: ArgumentsHost): Promise<void> {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    let status: number = exception.getStatus();
    let message: string = exception.message;
    let info: string = null;
    let internalServerError: boolean = false;

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
      internalServerError = true;
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = INTERNAL_SERVER_ERROR_MSG;
    }

    // log error
    Logger.error({
      method: request.method,
      url: request.originalUrl,
      ip: request.ip,
      params: request.params,
      query: request.query,
      body: request.body,
      exception: !internalServerError ? exception : exception.stack,
    });

    if (status !== HttpStatus.BAD_REQUEST && message !== VALIDATION_FAILED) {
      try {
        await this.httpLogsService.create({
          type: HttpLogTypeEnum.exception,
          httpStatusCode: status,
          url: request.originalUrl,
          requestData: JSON.stringify(request.body),
          description: message,
        });
      } catch (error) {
        console.error(error);
      }
    }
    // store error to database

    if (process.env.NODE_ENV !== 'development') {
      message = INTERNAL_SERVER_ERROR_MSG;
    }

    response
      .status(status)
      .json({
        statusCode: status,
        message,
        info,
      });
  }
}
