"use strict";
const cron = require("node-cron");
const debug = require("debug")("app:debug");
const paystack = require("./PaystackService.js");
const payment = require("../app/v1/payments/PaymentModel");
const { nanoid } = require("nanoid");
const user = require("../app/v1/user/UserModel");
const moment = require("moment");
const card = require("../app/cards/CardModel");

console.log("init Cron Service");

console.log("Cron service to keep Trove alive");
cron.schedule(
  "2 * * * * *",
  () => {
    console.log("cron");
    // const date  = ISODate();
console.log("date ",moment().toDate())
  },
  {}
);

console.log("Payment Cron runs every midnight");
cron.schedule(
  "0 23 * * * *",
  async () => {
    // TODO:
const today  = moment().toDate();
console.log("today",`${today}`, today )
    const paymentsArray = await payment.findOne({
      status: "false",
      paymentDate: { $lte: today },
    });
    // console.log(paymentsArray);
    const { amount, userId } = paymentsArray;
    const chargeUser = await user.findById({ _id: userId });

    const chargeCard = await card.findOne({ userId: userId });

    if (!chargeUser) console.log("error");
    const { email } = chargeUser;
    if (!chargeCard) console.log("error");
    const { cardAuth } = chargeCard;
    console.log(chargeCard.cardAuth);
    console.log(chargeUser.email);
    const metadata = { userId, email };
    console.log(metadata);
    const a = await paystack.charge(
      nanoid(10),
      cardAuth,
      amount,
      "olajuwonlawal2012@gmail.com",
      metadata
    );
    console.log("Payment cron ", a);
    if (a.data.status === "success") {
      const pending = await payment.findOneAndUpdate(
        { userId: paymentsArray.userId },
        { status: "pending" }
      );

      console.log("success", pending);
    }
  },
  {}
);
