"use strict";
const { number } = require("@hapi/joi");
const mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");


// const paymentScheduleSchema = mongoose.Schema(
//     {
//       monthlyPay: { type: Number, required: true },
//       repayment_date: { type: Date, required: true },
//       paid: { type: Boolean, default: false },
      
//     },
//     {
//       timestamps: true,
//     }
//   );
  
const loanSchema =  mongoose.Schema(
  {
    userId: { type: String, required: true },
     months: {type: Number, required: true},
    totalAmount: {type : Number, required: true },
    amountPaid : {type: Number},
    paid: {type : Boolean, default: false},
    card_id:{type: String}
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.loanId = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);
loanSchema.post("save", function (loan) {
  console.log("Post save ", loan);
});
loanSchema.index({ "$**": "text" });
loanSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("loan", loanSchema);
