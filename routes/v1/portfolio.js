"use strict"
const router = require('express').Router();
const portfolioController = require("../../app/v1/portfolio/PortfolioController");
const portfolioValidator = require("../../app/v1/portfolio/PortfolioValidator")
const {validateUser} = require("../../app/Middleware")

router.post("/add" , validateUser, portfolioValidator.addValidator, portfolioController.addPortfolio);
router.get("/getPortfolio", validateUser, portfolioController.getAllPortfolio);
router.get("/getPortfolioValue",validateUser, portfolioController.getPortfolioValue)
module.exports = router