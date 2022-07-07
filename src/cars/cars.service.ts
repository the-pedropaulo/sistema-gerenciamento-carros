import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarsService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async validateSignIn(data: any): Promise<any> {
        return {
            tik: 'tok'
        }
    }
}
