const bcrypt = require("bcrypt");

const getHashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.getAdminUserData = async () => {
  const password = await getHashedPassword(process.env.ADMIN_PASSWORD);

  const userObject = {
    email: process.env.ADMIN_EMAIL || "gourav@gmail.com",
    role: "admin",
    password: password,
   };
  return userObject;
};
