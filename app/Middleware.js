"use strict"
const debug = require("debug")("app:debug")
const jwt = require("jsonwebtoken");

exports.validateUser = async (req,res,next) => {
    let userToken  = req.headers['auth-token'] || req.headers['authorization'] 
    if(!userToken) return createErrorResponse(res, "You are not authorized to use this service", 403);

    if(userToken.startsWith('Bearer ')) userToken = userToken.slice( 7 , userToken.length);



    try{
        const decoded = jwt.verify(userToken, process.env.TOKEN_SECRET);
       
        req.user = decoded;
    }catch (err) {
        const errorMessage = err.message.replace(/['"]/g,'')
        if(errorMessage === "jwt expired") return createErrorResponse (res,"Session Expired",401 )
        return createErrorResponse(res,errorMessage, 401);
    }

    return next();

}