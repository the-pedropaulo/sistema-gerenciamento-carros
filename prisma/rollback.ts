require('dotenv').config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Excluir todos os dados (apenas para testes)
  if (process.env.APP_MODE !== 'production') {
    await prisma.$queryRaw`
      DROP SCHEMA public CASCADE;            
    `;

    await prisma.$queryRaw`
      CREATE SCHEMA public;
    `;
  }
}

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect();
    process.exit();
  });
