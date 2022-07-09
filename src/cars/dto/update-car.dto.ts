import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';

export class UpdateClientDto extends PartialType(CreateCarDto) {}
