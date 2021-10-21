"use strict";
const debug = require("debug")("äpp:debug");
const { number } = require("@hapi/joi");

const portfolioService = require("../portfolio/PortfolioService");
const loanService = require("./LoanService");


exports.getLoanStatus = async (req, res, next) => {
  const payload = req.body;
  const { userId } = payload;
  const { totalValue } = await portfolioService.getPortfolioValue(userId);
  const availableLoan = totalValue * 0.6;
  console.log("Available loan ", availableLoan);

  return createSuccessResponse(res, { availableLoan }, 200);
};

exports.createLoan = async (req, res, next) => {
  const payload = req.body;
  const { userId, amount, loanDuration } = payload;
  if (loanDuration < 6 || loanDuration > 12)
    return createErrorResponse(
      res,
      { message: "You can only take a loan for a period of 6 - 12 months" },
      413
    );
  const { totalValue } = await portfolioService.getPortfolioValue(userId);
  const applicableLoan = Math.floor(totalValue *0.6);
  if (amount > applicableLoan)
    return createErrorResponse(
      res,
    { message: `You can only take a loan thats 60% or less of your total equity value: N${applicableLoan}`},
      413
    );

  const { error, data } = await loanService.createLoan(payload);
  if(error) return createErrorResponse(res, error, 413);
  return createSuccessResponse(res, data, 200);
};

exports.applyLoan = async (req,res,next) => {

  this.createLoan

  return createSuccessResponse(res,"loan applied", 200)
}