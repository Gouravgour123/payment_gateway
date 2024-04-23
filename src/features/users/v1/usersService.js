const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;


async function createUser(full_name, email, mobileNumber, password) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      return new Error("User already exists.");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          
          full_name:full_name,
          email: email,
          mobile_number: mobileNumber,
          password: hashedPassword,
        },
      });
      const token = jwt.sign({ id: newUser.id }, secret_key);
      return { token: token, message: "User Signup is successfully." };
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}


async function loginUser(email, userpassword) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      const hashedPassword = existingUser.password;
      const isPasswordValid = await bcrypt.compare(
        userpassword,
        hashedPassword
      );
      if (isPasswordValid) {
        const token = jwt.sign({ id: existingUser.id }, secret_key);
        return { token: token, message: "User logged in successfully." };
      } else {
        return new Error("Incorrect password");
      }
    } else {
      return new Error("User does not exist");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

module.exports = {
 createUser,
 loginUser
 };