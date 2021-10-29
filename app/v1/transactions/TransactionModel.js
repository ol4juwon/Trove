"use strict";

const mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");

const transactionSchema = mongoose.Schema(
    {
      amount: { type: Number, required: true },
      paymentDate: { type: Date, required: true },
      status: { type: String, default: "pending" },
      userId: {type: String, required: true},
      retries: { type: Number},
      successfulOn: {type : Date}
    },
    {
      timestamps: true,
    }
  );

  

transactionSchema.index({ "$**": "text" });
transactionSchema.plugin(mongoosePaginate);
const myModel =  mongoose.model("transactions", transactionSchema);
module.exports = myModel