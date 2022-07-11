import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { getAllCars, registerCar } from './interfaces/cars-response.interface';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('brand') brand: string,
    @Query('name') name: string,
  ): Promise<getAllCars[]> {
    return this.carsService.getAllCars(page, limit, name, brand);
  }

  @Post('')
  async create(@Body() data: CreateCarDto): Promise<registerCar> {
    return this.carsService.registerCar(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: CreateCarDto,
  ): Promise<registerCar> {
    return this.carsService.updateCar(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<registerCar> {
    return this.carsService.deleteCar(id);
  }
}
