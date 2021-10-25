"use strict"
const moment = require("moment");
const LoanModel = require("./LoanModel");
const interestRate = parseFloat(process.env.LOAN_RATE);
exports.createLoan = async (payload) => {
    const {amount, loanDuration} = payload;

    // calculate monthly interest amount
    const monthlyInterest = Math.ceil(amount* interestRate);
    
        //calculate monthly premium
        const monthlyPay = Math.ceil( amount/ loanDuration) + monthlyInterest;
      
        
    let paymentSchedule = [];
    var futureMonth ;
    var i  = 0 ;
    var index = 1;
    var totalAmount = Math.ceil(monthlyPay* loanDuration) ;
    while(i < loanDuration){
        futureMonth = moment().add(index, 'M').format('YYYY-MM-DD');
        paymentSchedule.push({monthlyPay,"repayment_date": futureMonth, paid: false})
        i++;
        index++;
    
    }

  
    return { data : { paymentSchedule,months: loanDuration, totalAmount}}
}

exports.applyLoan = async (payload, userId) => { 
    console.log("payload.datum ",payload)
const {paymentSchedule,months,totalAmount} = payload;
    const loan = new LoanModel({
        userId,paymentSchedule,months,totalAmount
    })

    const {error, data} = await loan.save();
    
    if(error) return { error : error};

    return { data: data};

}
