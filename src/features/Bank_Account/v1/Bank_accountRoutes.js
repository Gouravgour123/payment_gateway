const express = require('express');
const { getBankAccount, createBankAccount, updateBankAccount, deleteBankAccount, getInactiveBankAccounts, deactivate_Bank_Account } = require('./Bank_accountController');
const { adminAuth } = require("@middlewares/authentication");
const router = express.Router()



router.post("/create",createBankAccount);
router.get("/list",adminAuth,getBankAccount);
router.put("/update/:id",adminAuth,updateBankAccount);
router.delete("/soft-delete/:id",adminAuth,deactivate_Bank_Account);
router.get('/trash-list',adminAuth,getInactiveBankAccounts);
router.delete("/delete/:id",adminAuth,deleteBankAccount);



module.exports = { path: "/api/bank-account/v1", router };