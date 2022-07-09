require('dotenv').config();

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Roles
  await prisma.roles.createMany({
    data: [
      {
        name: 'admin',
      },
      {
        name: 'customer',
      }
      
    ],
  });

  
  // Users: Admnistrator (Main)
  const administratorData = {
    email: 'vitorrbsilva@hotmail.com',
    password: 'k5fCYlmor6EXjj^&4GsZBCz1Jha1M5n',
    phone: '(75) 98744-0898',
    name: 'Administrador 1'
  };

  // Users: Customer (Main)
  const customerData = {
    password: '123456',
    name: "Fabricidcf Santos",
    phone: "(75) 98744-0798",
    email: "pedrounfs98@gmail.com",
    cpf: "11725570060",
    address: {
      cep: '55190000',
      street: 'R. Bela Vista',
      number: '473',
      complement: '',
      district: 'Santa Tereza',
      city: 'Santa Cruz do Capibaribe',
      uf: 'BA'
    }
  };

  // Check if already exist
  const existToAdministrator = await prisma.users.findUnique({
    where: {
      email: administratorData.email
    },
    select: {
      id: true,
    }
  });

  if (!existToAdministrator) {

    await prisma.users.create({
      data: {
        email: administratorData.email,
        password: await hash(administratorData.password, 10),
        phone: administratorData.phone,
        roleName: 'admin',
        Administrators: {
          create: {
            name: administratorData.name,
          }
        }
      }
    });
  }

  const existToCustomer = await prisma.users.findUnique({
    where: {
      email: customerData.email
    },
    select: {
      id: true,
    }
  });

  if (!existToCustomer) {

    await prisma.users.create({
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
                }
            }        
          }
        }
      }
    });
  }

  for (let index = 0; index < 21; index++) {
    await prisma.cars.createMany({
      data: [
        {
          name: 'Celta',
          brand: 'Chevrolet',
          model: 'Sedan',
          year: '1998',
        },
        {
          name: 'Toro',
          brand: 'Fiat',
          model: 'Sedan',
          year: '2012',
        },
        {
          name: 'Soul',
          brand: 'Soul',
          model: 'Flex',
          year: '2010',
        }
      ]
    });
    
  }
  
  

  

  
  


  
  

  
  
}

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect();
    process.exit();
  });