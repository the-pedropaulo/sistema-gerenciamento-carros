import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Users } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { generateRandomString } from '../shared/utils/generateRandomString';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  generateAccessToken(user: Users): string {
    const { id, email, roleName } = user;

    const payload = {
      sub: id,
      email,
      roleName
    };
    const secret = this.configService.get<string>('JWT_SECRET');
    const expirationTime = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );

    const token = sign(payload, secret, {
      expiresIn: expirationTime,
    });

    return token;
  }

  generateRefreshToken(): string {
    const token = generateRandomString(16);

    return token;
  }
}
