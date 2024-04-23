const express = require('express');
const router = express.Router();
const {
  createRawMessage,
} = require("./RawMessageController");

// Define your routes here
router.post("/create", createRawMessage);
//Change base with your route name
module.exports = { path: '/api/raw-message/v1', router };