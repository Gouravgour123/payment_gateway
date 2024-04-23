const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const { adminInput, getAdminUserData } = require("./seeds/admin.seeds");
const bcrypt = require("bcrypt");

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  try {
    const adminUserSeed = await getAdminUserData();

    if (
      (await prisma.admin.count({
        where: {
          email: adminUserSeed.email,
        },
      })) > 0
    ) {
      throw new Error(" 🌱 Seeding was already done. ");
    }
    await prisma.admin.create({
      data: {
        ...adminUserSeed,
      },
    });

    console.log("🌱 Seeding done successfully.");
  } catch (error) {
    console.error("Error creating seed data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
