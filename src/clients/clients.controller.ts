import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { getAllClients } from './interfaces/clients-response.interface';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() data: CreateClientDto) {
    return this.clientsService.registerClient(data);
  }

  @Get()
  findAll(): Promise<getAllClients[]> {
    return this.clientsService.getAllClients();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateClientDto) {
    return this.clientsService.updateClient(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.removeClient(id);
  }
}
