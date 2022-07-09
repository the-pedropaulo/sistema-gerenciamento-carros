import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CarsModule } from './cars/cars.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    PrismaModule,
    CarsModule,
    ClientsModule
  ],
})
export class AppModule {}
