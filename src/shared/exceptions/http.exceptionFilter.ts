import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.getResponse();
    const error =
      typeof exceptionResponse === 'string'
        ? { message: [exceptionResponse] }
        : (exceptionResponse as Record<string, any>);

    const logEntry = {
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.url,
      statusCode: status,
      error,
      body: request.body,
      query: request.query,
      params: request.params,
    };

    // Log the exception to the console
    this.logger.error(
      `HTTP Status: ${status}, Error: ${JSON.stringify(error)}`,
    );

    // Write the log to a daily .txt file
    this.writeLogToFile(logEntry);

    // Send the response
    response.status(status).json({
      statusCode: status,
      timestamp: logEntry.timestamp,
      path: logEntry.path,
      error,
      method: logEntry.method,
    });
  }

  private writeLogToFile(logEntry: Record<string, any>): void {
    const logDirectory = path.resolve('src/logs');

    const fileName = `${new Date().toISOString().split('T')[0]}.txt`; // e.g., 2024-11-18.txt
    const filePath = path.join(logDirectory, fileName);

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }

    const logMessage = `[${logEntry.timestamp}] ${logEntry.method} ${logEntry.path} - ${JSON.stringify(logEntry)}\n`;

    fs.appendFileSync(filePath, logMessage, { encoding: 'utf8' });
  }
}
