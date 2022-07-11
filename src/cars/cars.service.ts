import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { getAllCars, registerCar } from './interfaces/cars-response.interface';

@Injectable()
export class CarsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCars(
    _page: number,
    _limit: number,
    _name: string,
    _brand?: string,
  ): Promise<getAllCars[]> {
    if (_name) {
      const cars = await this.prismaService.cars.findMany({
        skip: Number(_limit) * (Number(_page) - 1),
        take: Number(_limit),
        where: {
          name: _name,
        },
        select: {
          name: true,
          brand: true,
          model: true,
          year: true,
        },
      });

      return cars;
    }

    if (_brand) {
      const cars = await this.prismaService.cars.findMany({
        skip: Number(_limit) * (Number(_page) - 1),
        take: Number(_limit),
        where: {
          brand: _brand,
        },
        select: {
          name: true,
          brand: true,
          model: true,
          year: true,
        },
      });

      return cars;
    }

    const cars = await this.prismaService.cars.findMany({
      skip: Number(_limit) * (Number(_page) - 1),
      take: Number(_limit),
      select: {
        name: true,
        brand: true,
        model: true,
        year: true,
      },
    });

    return cars;
  }

  async registerCar(data: CreateCarDto): Promise<registerCar> {
    const car = await this.prismaService.cars.create({
      data: {
        name: data.name,
        brand: data.brand,
        model: data.model,
        year: data.year,
      },
    });

    if (!car) {
      return {
        status: 'FAILED',
        message:
          'Não foi possível cadastrar o carro! Tente novamente mais tarde.',
      };
    }
    return {
      status: 'SUCCESS',
      message: 'Carro cadastrado com sucesso!',
    };
  }

  async updateCar(id_car: string, data: CreateCarDto): Promise<registerCar> {
    const car = await this.prismaService.cars.update({
      where: {
        id: id_car,
      },
      data: {
        name: data.name,
        brand: data.brand,
        model: data.model,
        year: data.year,
      },
    });

    if (!car) {
      return {
        status: 'FAILED',
        message:
          'Não foi possível atualizar o carro! Tente novamente mais tarde.',
      };
    }
    return {
      status: 'SUCCESS',
      message: 'Carro atualizado com sucesso!',
    };
  }

  async deleteCar(id_car: string): Promise<registerCar> {
    const car = await this.prismaService.cars.delete({
      where: {
        id: id_car,
      },
    });

    if (!car) {
      return {
        status: 'FAILED',
        message:
          'Não foi possível deletar o carro! Tente novamente mais tarde.',
      };
    }
    return {
      status: 'SUCCESS',
      message: 'Carro deletado com sucesso!',
    };
  }
}
