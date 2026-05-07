import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.adminUser.findMany();
  console.log('Admin Users:', users.map(u => ({ email: u.email, name: u.name, isActive: u.isActive })));
  await prisma.$disconnect();
}

main().catch(console.error);
