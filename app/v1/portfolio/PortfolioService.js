"use strict";
const { number } = require("@hapi/joi");
const Portfolio = require("./PortfolioModel");


exports.getPortfolio = async ( userId ) => {
    const portfolio = await Portfolio.find(
        { userId: userId}, '-_id').select('symbol totalQuantity pricePerShare equityValue');

    if(!portfolio) return {error: "Error geting portfolio, Try again later"};
    return { data : portfolio};
    
}

exports.getPortfolioValue = async ( userId ) => {
    const {error, data}  = await this.getPortfolio(userId) ;
    let i = 0;
let totalValue = 0;
for(i in data){
    totalValue += data[i].equityValue;
}
    return { totalValue};

}

exports.addPortfolio = async ( payload ) => {
    const { userId,symbol, totalQuantity , pricePerShare } = payload;
const equityValue = (totalQuantity * pricePerShare);
console.log("equity value ===",equityValue)
    const portfolio  = new Portfolio({
        userId : userId,
        symbol: symbol,
        totalQuantity : totalQuantity,
        pricePerShare: pricePerShare,
        equityValue : equityValue
    })

    const portf= await portfolio.save();

    if(!portf) return { error: error};

    return { data : portf};
}