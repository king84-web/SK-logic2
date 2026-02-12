// seed-neon.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Trapper84", 10);
  
  // Based on your previous Prisma Studio screenshot
  console.log("🚀 Seeding Neon database...");
  await prisma.adminSettings.upsert({
    where: { email: "kamarasolomon164@gmail.com" },
    update: { password: hashedPassword },
    create: {
      email: "kamarasolomon164@gmail.com",
      password: hashedPassword,
    },
  });
  console.log("✅ SUCCESS: Admin created in Neon!");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
