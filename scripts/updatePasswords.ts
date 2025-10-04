import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function updatePasswords() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    // Hash the password (replace with real password logic)
    const hashedPassword = await bcrypt.hash('password123!', 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, active: true },
    });
    console.log(`Updated password for user ${user.email}`);
  }
}

updatePasswords()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
