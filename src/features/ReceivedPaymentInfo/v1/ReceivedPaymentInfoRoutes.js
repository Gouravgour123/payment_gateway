const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('User v1');
});
//Change base with your route name
module.exports = { path: '/api/base/v1', router };