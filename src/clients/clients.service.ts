import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {
  getAllClients,
  registerClient,
} from './interfaces/clients-response.interface';

@Injectable()
export class ClientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerClient(data: CreateClientDto): Promise<registerClient> {
    const customerData = {
      password: data.password,
      name: data.name,
      phone: data.phone,
      email: data.email,
      cpf: data.cpf,
      address: {
        cep: data.address.cep,
        street: data.address.street,
        number: data.address.number,
        complement: data.address.complement,
        district: data.address.district,
        city: data.address.city,
        uf: data.address.uf,
      },
    };

    const existToCustomer = await this.prismaService.users.findUnique({
      where: {
        email: customerData.email,
      },
      select: {
        id: true,
      },
    });

    if (existToCustomer) {
      return {
        status: 'FAILED',
        message:
          'Não foi possível criar o cliente! Tente novamente mais tarde.',
      };
    }

    await this.prismaService.users.create({
      data: {
        email: customerData.email,
        password: await hash(customerData.password, 10),
        phone: customerData.phone,
        roleName: 'customer',
        Customers: {
          create: {
            name: customerData.name,
            cpf: customerData.cpf,
            Address: {
              create: {
                cep: customerData.address.cep,
                street: customerData.address.street,
                number: customerData.address.number,
                complement: customerData.address.complement,
                district: customerData.address.district,
                city: customerData.address.city,
                uf: customerData.address.uf,
              },
            },
          },
        },
      },
    });

    return {
      status: 'SUCCESS',
      message: 'Cliente cadastrado com sucesso!',
    };
  }

  async getAllClients(): Promise<getAllClients[]> {
    const clients = await this.prismaService.customers.findMany({
      select: {
        name: true,
        cpf: true,
      },
    });

    return clients;
  }

  async updateClient(
    _id: string,
    data: UpdateClientDto,
  ): Promise<registerClient> {
    const client = await this.prismaService.users.update({
      where: {
        id: _id,
      },
      data: {
        password: await hash(data.password, 10),
        phone: data.phone,
        email: data.email,
        Customers: {
          update: {
            name: data.name,
            cpf: data.cpf,
            Address: {
              update: {
                cep: data.address.cep,
                street: data.address.street,
                number: data.address.number,
                complement: data.address.complement,
                district: data.address.district,
                city: data.address.city,
                uf: data.address.uf,
              },
            },
          },
        },
      },
    });

    if (!client) {
      return {
        status: 'FAILED',
        message:
          'Não foi possível atualizar o cliente! Tente novamente mais tarde.',
      };
    }
    return {
      status: 'SUCCESS',
      message: 'Cliente atualizado com sucesso!',
    };
  }

  async removeClient(_id: string) {
    const client = await this.prismaService.users.delete({
      where: {
        id: _id,
      },
    });

    if (!client) {
      return {
        status: 'FAILED',
        message:
          'Não foi possível deletar o cliente! Tente novamente mais tarde.',
      };
    }
    return {
      status: 'SUCCESS',
      message: 'Cliente deletado com sucesso!',
    };
  }
}
