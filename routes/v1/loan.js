"use strict";
const router = require("express").Router();
const { validateUser } = require("../../app/Middleware");
const loanController = require("../../app/v1/loan/LoanController");
const loanValidator = require("../../app/v1/loan/LoanValidator");


router.get("/getLoan", validateUser, loanController.getLoanStatus);
router.post("/getLoan", validateUser,loanValidator.validateCreateLoan, loanController.createLoan);
router.post("/applyLoan", validateUser,loanValidator.validateCreateLoan,loanController.applyLoan)
router.get("/loans",validateUser, loanController.viewActive);
module.exports = router;
