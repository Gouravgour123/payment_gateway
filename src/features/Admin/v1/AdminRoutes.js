const express = require('express');
const router = express.Router();
const{loginSync}=require('./AdminController')


router.post('/admin-login', loginSync);


module.exports = { path: "/api/Admin/v1", router };




