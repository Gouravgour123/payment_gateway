const express = require('express');
const router = express.Router()
const {createUPI,getUPI,updateUPI, deleteUpi, getAllInactiveUpi, deactivate_UPI} = require('./UpiController');
const { adminAuth } = require("@middlewares/authentication");



router.post("/create",createUPI);
router.get("/list",adminAuth,getUPI);
router.put("/update/:id",adminAuth,updateUPI);
router.delete("/soft-delete/:id",adminAuth,deactivate_UPI);
router.get('/trash-list',adminAuth,getAllInactiveUpi);
router.delete("/delete/:id",adminAuth,deleteUpi);



module.exports = { path: "/api/upi/v1", router };