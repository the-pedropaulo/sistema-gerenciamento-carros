import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('')
  @HttpCode(200)
  async signIn(@Body() data: any): Promise<any> {
    return this.carsService.validateSignIn(data);
  }
}
