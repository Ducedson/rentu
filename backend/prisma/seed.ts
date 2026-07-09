import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@rentu.com';
  const password = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: 'Administrador Rentu',
      password,
      role: UserRole.ADMIN,
      status: 'ACTIVE',
    },
    create: {
      name: 'Administrador Rentu',
      email,
      password,
      role: UserRole.ADMIN,
      status: 'ACTIVE',
    },
  });

  console.log('Admin pronto: admin@rentu.com / admin123');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
