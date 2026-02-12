const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // Or 'bcrypt' depending on your package.json

const prisma = new PrismaClient();

async function main() {
  const email = "kamarasolomon164@gmail.com";
  const plainPassword = "Trapper84";
  
  // Hash the password so the login system recognizes it
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  console.log(`🚀 Creating admin: ${email}...`);

  const user = await prisma.user.upsert({
    where: { email: email },
    update: { password: hashedPassword },
    create: {
      email: email,
      password: hashedPassword,
      // name: "Admin", // Uncomment if your model requires a name field
    },
  });

  console.log("✅ Admin user created/updated successfully!");
  console.log(user);
}

main()
  .catch((e) => {
    console.error("❌ Error creating admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
