import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'kamarasolomon164@gmail.com';
  const plainPassword = 'Trapper84';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Upsert admin settings with email and password
  await prisma.adminSettings.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      password: hashedPassword,
      siteName: 'SK Logic',
      siteEmail: 'info@sklogic.com',
      maintenanceMode: false,
      analyticsEnabled: true,
    },
  });

  console.log('Admin seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
