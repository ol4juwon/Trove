"use strict"
const debug = require("debug")("app:debug:portfolio")
const portfolioService = require('./PortfolioService');

exports.getAllPortfolio = async (req,res,next) => {
const {userId }= req.body
console.log("userId ", userId)
    const {error, data} = await portfolioService.getPortfolio(userId);
console.log("get All Portfolio: ", data)

if(error) createErrorResponse(res, error, 412);

return createSuccessResponse(res,data,200);
}

exports.getPortfolioValue = async (req,res,next) => {
// Get his total portfolio value
const {userId }= req.body
console.log("userId ", userId)
    const {error, data} = await portfolioService.getPortfolio(userId);
if(error) return createErrorResponse(res,error, 412);
let i = 0;
let totalValue = 0;
for(i in data){
    totalValue += data[i].equityValue;
}

return createSuccessResponse(res,{ portfolioValue: totalValue} , 200);
}

exports.getPortfolioById = (req, res,next) => {

console.log("Single Portfolio", req.body)
    return createSuccessResponse(res, "", 200);
}

exports.addPortfolio= async (req,res,next) => {

    const payload = req.body;

    const { error, data } = await portfolioService.addPortfolio(payload);

    if(error) return createErrorResponse(res,"Error Adding Portfolio", 412);

    console.info("add portfolio");
    return createSuccessResponse( res,data,200);
}