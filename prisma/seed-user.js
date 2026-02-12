const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = "kamarasolomon164@gmail.com";
  const password = "Trapper84";
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("🌱 Inserting Admin into Neon 'User' table...");

  await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: { password: hashedPassword },
    create: {
      email: email.toLowerCase(),
      password: hashedPassword,
    },
  });

  console.log("✅ SUCCESS: User created in Neon!");
}

main()
  .catch((e) => { 
    console.error("❌ Error:", e.message); 
    process.exit(1); 
  })
  .finally(async () => { 
    await prisma.$disconnect(); 
  });
