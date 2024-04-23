const express = require("express");
const router = express.Router();
const {
  signupSync,
  loginSync
} = require("./usersController");

// Define your routes here
router.post("/signup", signupSync);
router.post("/login", loginSync);

//Change base with your route name
module.exports = { path: "/api/user/v1", router };