import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (!req.headers.authorization.startsWith('Bearer ')) {
      throw new HttpException(
        'Invalid token. Provide a valid token.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const [, token] = bearerToken;

    try {
      const verifyToken = verify(token, 'secret');

      if (verifyToken) {
        next();
      }
    } catch (error) {
      throw new HttpException(
        'Invalid token. Provide a valid token.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
