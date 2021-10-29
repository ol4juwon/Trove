"use strict";
const debug = require("debug")("äpp:debug");
const { number } = require("@hapi/joi");
const loan = require("./LoanModel");
const payment = require("../payments/PaymentModel");
const portfolioService = require("../portfolio/PortfolioService");
const loanService = require("./LoanService");
const cardModel = require("../../cards/CardModel");
const user = require("../user/UserModel");
const paystackService = require("../../../services/PaystackService");

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
  const applicableLoan = Math.floor(totalValue * 0.6);
  if (amount > applicableLoan)
    return createErrorResponse(
      res,
      {
        message: `You can only take a loan thats 60% or less of your total equity value: N${applicableLoan}`,
      },
      413
    );

  const { error, data } = await loanService.createLoan(payload);
  if (error) return createErrorResponse(res, error, 413);
  return createSuccessResponse(res, data, 200);
};

exports.applyLoan = async (req, res, next) => {
  const payload = req.body;
  const { userId } = payload;
  const applicant = user.findOne({ userId: userId });

  // verify user can take loan
  const hasLoan = await payment.find({ userId: userId, status: "false" });
  // console.log( "booker",hasLoan.length)
  // if (hasLoan.length > 0)
  //   return createSuccessResponse(
  //     res,
  //     "You can't take a loan atm. You already have an active loan ",
  //     403
  //   );
  // console.log(payload)

  let { error, data } = await loanService.createLoan(payload);
  if (error) return createErrorResponse(res, error, 413);
  const book = await loanService.applyLoan(data, userId);

  if (book.error) return createErrorResponse(res, error, 413);
  const hasCard = await cardModel.findOne({ userId: userId });
const metadata =  {
  userId : userId
}
  if (!hasCard) {
    const paylink = await paystackService.initialize(
      10,
      null,
      book._id,
      applicant.email,
      metadata   
    );
    if(paylink.data) return createSuccessResponse(res,paylink.data, 203);
    console.log("paylink ", paylink.data);
  }

  // const init  = await paystackService.initialize(10000,null, "des" , "olajuwonlawal2012@gmail.com")
  // update loans
  // console.log("my data ", book.data)
  // return success/ failure

  console.log("has card", hasCard);
  return createSuccessResponse(res, hasCard, 200);
};
