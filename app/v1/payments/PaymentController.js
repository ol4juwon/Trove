"use strict";
const { response, request } = require("express");
const debug = require("debug")("äpp:debug");
const paymentModel = require("./PaymentModel");
const paystack = require("../../../services/PaystackService");
const card = require("../../cards/CardModel");
const user = require("../../v1/user/UserModel");
const { nanoid } = require("nanoid");

exports.repayLoan = async (req, res, next) => {
  let payload = req.body;

  let { amount, email, userId, transactionId, loanId, cardAuth } = payload;
  transactionId = nanoid(12);

  payload.metadata = {
    userId: userId,
    email: email,
    transactionId: transactionId,
    loanId: loanId,
  };
  let repay;
  if (cardAuth) {
    repay = await paystack.charge(
      transactionId,
      cardAuth,
      amount,
      email,
      payload.metadata
    );
  } else {
    repay = await paystack.initialize(
      amount,
      null,
      transactionId,
      email,
      payload.metadata
    );
  }
//   console.log(repay);
return  createSuccessResponse(res, repay.data, 202);
};
exports.verifying = async (req, res, next) => {
  console.log(" verify paystack", req.query.trxref, req.query.reference);

  const ref = req.query.reference;
  const verify = await paystack.verify(ref);
  console.log("verify", verify);

  if (!verify.status);
  const {
    id,
    reference,
    status,
    amount,
    paidAt,
    metadata,
    createdAt,
    channel,
    bank,
    last4,
    currency,
    authorization,
    requested_amount,
    card_type,
    customer,
  } = verify.data;
  const findUser = await user.findById({ _id: metadata.data.userId });
  console.log(findUser);
  console.log(authorization.authorization_code);
  const isAlreadyStoredcard = await card.findOne({
    cardAuth: authorization.authorization_code,
  });
  console.log("card stored", isAlreadyStoredcard);
  if (!isAlreadyStoredcard) {
    const storeCard = await card.create({
      userId: metadata.userId,
      gateway: "paystack",
      cardAuth: authorization.authorization_code,
      bank: authorization.bank,
      last4: authorization.last4,
      email: findUser.email,
      cardType: authorization.card_type,
      customer: `${customer}`,
    });
  }
  return createSuccessResponse(
    res,
    { amount, channel, authorization, status, requested_amount, currency },
    202
  );
};
