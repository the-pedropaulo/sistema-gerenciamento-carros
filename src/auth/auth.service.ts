import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { ClientsService } from 'src/clients/clients.service';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { registerClient } from 'src/clients/interfaces/clients-response.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidationException } from 'src/shared/exceptions/validation.exception';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin-auth.dto';
import { UserTokens } from 'src/shared/interfaces/user-tokens.interface';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly clientService: ClientsService,
    private readonly tokenService: TokenService
  ) {}

  async validateSignIn(data: SignInDto): Promise<Users> {
    const userWithProvidedEmail = await this.prismaService.users.findUnique({
      where: {
        email: data.email,
      },
    });

    const hasUserWithProvidedEmail = !!userWithProvidedEmail;

    if (!hasUserWithProvidedEmail) {
      throw new ValidationException([
        {
          message: 'Não existe um usuário com esse email.',
          property: 'email',
        },
      ]);
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      userWithProvidedEmail.password,
    );

    if (!isPasswordValid) {
      throw new ValidationException([
        {
          message: 'A senha informada não confere.',
          property: 'password',
        },
      ]);
    }

    return userWithProvidedEmail;
  }

  async generateTokens(user: Users): Promise<UserTokens> {
    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken();

    const apiTokenCount = await this.prismaService.apiTokens.count({
      where: {
        userId: user.id,
      },
    });

    const newRefreshToken = apiTokenCount + 1 + '|' + refreshToken;

    await this.prismaService.apiTokens.create({
      data: {
        token: newRefreshToken,
        userId: user.id,
      },
    });

    const firstLogin = Number(newRefreshToken.split('|')[0]);
    const isFirstLogin = firstLogin === 1 ? 'true' : 'false';

    let userDetails = {};

    if (user.roleName === 'admin') {
      const partner = await this.prismaService.administrators.findUnique({
        where: {
          userId: user.id,
        },
      });
      userDetails = {
        userId: user.id,
        email: user.email,
        name: partner.name,
        roleName: user.roleName,
      };
    }

    if (user.roleName === 'customer') {
      const beneficiary = await this.prismaService.customers.findUnique({
        where: {
          userId: user.id,
        },
      });
      userDetails = {
        userId: user.id,
        email: user.email,
        name: beneficiary.name,
        roleName: user.roleName,
      };
    }

    return {
      accessToken,
      refreshToken: newRefreshToken,
      firstLogin: isFirstLogin,
      userDetails: userDetails,
    };
  }

  async signUp(data: CreateClientDto): Promise<registerClient> {
    return this.clientService.registerClient(data);
  }

  
}
