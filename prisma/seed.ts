import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    '123456',
    10,
  );

  // SUPER ADMIN
  const superAdmin =
    await prisma.user.findUnique({
      where: {
        email: 'superadmin@gmail.com',
      },
    });

  if (!superAdmin) {
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'superadmin@gmail.com',
        password: hashedPassword,
        phone: '081111111111',
        role: Role.SUPER_ADMIN,
      },
    });

    console.log(
      '✅ Super Admin berhasil dibuat',
    );
  }

  // PETUGAS
  const admin =
    await prisma.user.findUnique({
      where: {
        email: 'admin@gmail.com',
      },
    });

  if (!admin) {
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        phone: '082222222222',
        role: Role.PETUGAS,
      },
    });

    console.log('✅ Admin berhasil dibuat');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });