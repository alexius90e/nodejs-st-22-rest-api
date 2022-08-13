import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  public use(req: Request, res: Response, next: NextFunction): void {
    console.log(req, res);

    this.logger.debug(`method: ${req.method}, path: ${req.baseUrl}`);

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
