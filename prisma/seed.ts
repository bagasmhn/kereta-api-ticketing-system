import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // hash password
  const hashedPassword = await bcrypt.hash('123456', 10);

  // cek apakah admin sudah ada
  const adminExists = await prisma.user.findUnique({
    where: {
      email: 'admin@gmail.com',
    },
  });

  // kalau belum ada → buat admin
  if (!adminExists) {
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        phone: '08123456789',
        role: Role.PETUGAS,
      },
    });

    console.log('✅ Admin berhasil dibuat');
  } else {
    console.log('⚠️ Admin sudah ada');
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