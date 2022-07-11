import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientsModule } from 'src/clients/clients.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [PrismaModule, ClientsModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
