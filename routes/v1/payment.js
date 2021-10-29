"use strict";
const router = require("express").Router();
const paymentController = require("../../app/v1/payments/PaymentController");
const loanValidator = require("../../app/v1/loan/LoanValidator");

// router.get('/',paymentController.verifying )
router.post('/repayLoan', paymentController.repayLoan)

module.exports = router;