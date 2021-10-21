"use strict"
const router = require('express').Router();
const authController = require("../../app/v1/auth/AuthController");
const authValidator = require("../../app/v1/auth/AuthValidator")
const {validateUser} = require("../../app/Middleware")

router.post("/register",authValidator.registerValidation, authController.register);
router.post("/login", authValidator.loginValidation, authController.login);

router.post("/updatePassword",validateUser, authValidator.updateValidation,authController.updatePassword)
router.post("/updateName", validateUser , authValidator.CNvalidation, authController.updateName);
router.post("/updateEmail", validateUser,authValidator.CEValidation,authController.updateEmail);
module.exports = router