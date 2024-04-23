const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const uuuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;



async function loginAdmin(email, adminpassword) {
  try {
    const AdminExists = await prisma.admin.findFirst({
      where: { email: email },
    });
    if (AdminExists) {
      const hashedPassword = AdminExists.password;
      const isPasswordValid = await bcrypt.compare(
        adminpassword,
        hashedPassword
      );
      if (isPasswordValid) {
        const token = jwt.sign({ id: AdminExists.id }, secret_key);
        return { token: token, message: "Admin logged in successfully." };
      } else {
        return new Error("Incorrect password");
      }
    } else {
      return new Error("Admin does not exist");
    }
  } catch (error) {
    console.error("Error logging in Admin:", error);
    throw error;
  }
}

module.exports = {loginAdmin}

