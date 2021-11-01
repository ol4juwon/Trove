"use strict";

const mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");


const paymentSchema = mongoose.Schema(
    {
      amount: { type: Number, required: true },
      paymentDate: { type: Date, required: true },
      status: { type: String, default: "pending" },
      userId: {type: String, required: true},
      retries: { type: Number},
      loanId: {type: String, required: true},
      successfulOn: {type : Date}
    },
    {
      timestamps: true,
    }
  );

  


paymentSchema.index({ "$**": "text" });
paymentSchema.plugin(mongoosePaginate);
const myModel =  mongoose.model("Payments", paymentSchema);
module.exports = myModel