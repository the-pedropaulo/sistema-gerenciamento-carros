import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    PrismaModule,
    CarsModule
  ],
})
export class AppModule {}
