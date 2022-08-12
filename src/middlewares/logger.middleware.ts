import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    console.log(req, res, `\nMethod: ${req.method}\nPath: ${req.url}`);
    next();
  }
}
