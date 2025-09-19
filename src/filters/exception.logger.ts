import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpCode } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    Logger.error(`${status} ERROR with message ${exception.message}`)
    response.json(exception.getResponse())
  }
}