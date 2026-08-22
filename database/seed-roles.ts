import "dotenv/config";
import { PrismaClient, RoleName } from "../backend/src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const roles: RoleName[] = [
    RoleName.STUDENT,
    RoleName.TEACHER,
    RoleName.ADMIN,
    RoleName.PARENT,
  ];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Roller başarıyla oluşturuldu:", roles.join(", "));
}

main()
  .catch((error) => {
    console.error("Roller oluşturulamadı:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
