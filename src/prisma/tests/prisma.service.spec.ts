import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
      exports: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  /**
   * Esses testes podem parecer simples, mas garantem que
   * o Prisma Client foi gerado de forma correta.
   */

  it('should have $connect method', () => {
    expect(service.$connect).toBeDefined();
  });

  it('should have $disconnect method', () => {
    expect(service.$disconnect).toBeDefined();
  });
});
