import { Controller, Post, Body } from '@nestjs/common';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { registerClient } from 'src/clients/interfaces/clients-response.interface';
import { UserTokens } from 'src/shared/interfaces/user-tokens.interface';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() data: SignInDto): Promise<UserTokens> {
    const user = await this.authService.validateSignIn(data);
    const tokens = await this.authService.generateTokens(user);
    return tokens;
  }

  @Post('signup')
  async signUp(@Body() data: CreateClientDto): Promise<registerClient> {
    return this.authService.signUp(data);
  }
}
