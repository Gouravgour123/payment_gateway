const express = require('express');
const { createMerchantController, getMerchant, deleteMerchant, updateMerchant,updateSecretKeys, getAllInactiveMerchant, deactivateMerchant,payRequest,after_payment_info, loginSync, changePassword } = require('./MerchantController');
const { merchantAuth, adminAuth } = require('../../../middlewares/authentication');
const router = express.Router()

router.post("/create",createMerchantController);
router.post('/merchant-login', loginSync);
router.post('/change-password',merchantAuth, changePassword);
router.get("/list",adminAuth,getMerchant);
router.put("/update/:id",adminAuth,updateMerchant);
router.put("/update-Secret/:id",adminAuth,updateSecretKeys);
router.delete("/soft-delete/:id",adminAuth,deactivateMerchant);
router.get('/trash-list',adminAuth,getAllInactiveMerchant);
router.delete("/delete/:id",adminAuth,deleteMerchant);
// router.post("/fxsecure-payment-gatway",payRequest)
// router.post("/upi-id",upi_ID)
// router.post('/fxsecurepaymentgatway.com/:id',after_payment_info)
// router.post('/fxsecure-payment-gatway-withdraw-request',withdrwRequest)






module.exports = { path: "/api/merchant/v1", router };