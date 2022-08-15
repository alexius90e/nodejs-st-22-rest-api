import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  public use(request: Request, response: Response, next: NextFunction): void {
    console.log(request, response);

    this.logger.debug(`method: ${request.method}, path: ${request.baseUrl}`);

    process
      .on('uncaughtException', (err, origin) => {
        this.logger.error(`Caught exception: ${err}\nException origin: ${origin}`);
      })
      .on('unhandledRejection', (reason, promise) => {
        this.logger.error(`Unhandled Rejection at: ${promise}, 'reason: ${reason}`);
      });

    next();
  }
}
