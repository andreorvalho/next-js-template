import prisma from "../lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  const hashedPassword = await hash("Password123!", 10);

  await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
