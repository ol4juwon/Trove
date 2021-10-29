"use strict"
const moment = require("moment");
const paymentModel = require("./PaymentModel");

exports.addPaymentSchedule = async (payload, userId) => {
    // console.log("payload  ",payload)
    let size  = payload.length
    let index = 0;
    while(index < size){
        // console.log(payload[index])
        const {monthlyPay ,repayment_date, paid} = payload[index];
    const amount  = parseInt(monthlyPay);
    // console.log(paymentSchedule);
        const payment = new paymentModel({
            amount,paymentDate:  repayment_date,userId,status:paid ,retries:0,successfulOn: null
        })

        const bokl = await payment.save();
        const {error } = bokl;
        // console.log("Service ",bokl)
        if(error) return { error : error};
        index++;
    }
    
    
        return { data: "done"};
}
