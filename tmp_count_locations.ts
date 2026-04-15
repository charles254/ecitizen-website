import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.location.count();
  console.log(`TOTAL_LOCATIONS:${count}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
