const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// require('dotenv').config();


exports.adminAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    const _id = decoded.id;
    const adminExists = await prisma.admin.findFirst({
      where: {
        id: _id,
        role: "admin",
      },
    });
    if (adminExists) {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ error: error.message });
  }
};

// exports.userAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     // console.log(authHeader);
//     if (!authHeader) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     const accessToken = authHeader.split(" ")[1];
//     if (!accessToken) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
//     // console.log(decoded)

//     const userId = decoded.id;
//     const user = await prisma.user.findUnique({
//     // const merchant = await prisma.merchant.findUnique({
//       where: { id: userId },
//       // where: { id: merchantId },
//     });
//     if (!user) {
//     // if (!merchant) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     req.user = user;
//     // req.user = merchant;
//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error.message);
//     return res.status(500).json({ error: error.message });
//   }
// };




exports.merchantAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    const merchantId = decoded.id;
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    });
    if (!merchant) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = merchant;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(500).json({ error: error.message });
  }
};