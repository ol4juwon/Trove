"use strict";
const moment = require("moment");
const LoanModel = require("./LoanModel");
const interestRate = parseFloat(process.env.LOAN_RATE);
const paymentService = require("../payments/PaymentService");
exports.createLoan = async (payload) => {
  const { amount, loanDuration } = payload;

  // calculate monthly interest amount
  const monthlyInterest = Math.ceil(amount * interestRate);

  //calculate monthly premium
  const monthlyPay = Math.ceil(amount / loanDuration) + monthlyInterest;

  let paymentSchedule = [];
  var futureMonth;
  var i = 0;
  var index = 1;
  var totalAmount = Math.ceil(monthlyPay * loanDuration);
  while (i < loanDuration) {
    futureMonth = moment().add(index, "M").format("YYYY-MM-DD");
    paymentSchedule.push({
      monthlyPay,
      repayment_date: futureMonth,
      paid: false,
    });
    i++;
    index++;
  }

  return { data: { paymentSchedule, months: loanDuration, totalAmount } };
};

exports.applyLoan = async (payload, userId) => {
  // console.log("payload.datum ",payload)
  const { paymentSchedule, months, totalAmount } = payload;

  const amountPaid = 0;
  const loan = new LoanModel({
    userId,
    months,
    totalAmount,
    amountPaid
  });

  const bokl = await loan.save();
  console.log(" book id",bokl._id)
  const loanId = bokl.id;
  const payments = await paymentService.addPaymentSchedule(
    paymentSchedule,
    userId,
    loanId
  );
  const { error } = bokl;
  // console.log("Payments"+ payments)
  // console.log("Service ",bokl)
  if (error) return { error: error };

  return { data: bokl };
};
