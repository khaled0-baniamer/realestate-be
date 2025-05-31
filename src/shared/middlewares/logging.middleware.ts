import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
class LoggingMiddleware implements NestMiddleware {
  constructor() {}
  logger = new Logger('Response');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req;

    const reqTime = new Date().getTime();
    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime();
      this.logger.log(
        `${method} ${url} ${statusCode} - ${resTime - reqTime} ms`,
      );
    });

    next();
  }
}

export default LoggingMiddleware;
