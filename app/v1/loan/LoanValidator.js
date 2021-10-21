"use strict"

const Joi = require('@hapi/joi')

exports.validateCreateLoan =  (req,res,next) => {
    console.log("Before Validating ===> ", req.body)
    const schema = Joi.object( {
        userId: Joi.string().min(4).required(),
        amount: Joi.number().required(),
        loanDuration: Joi.number().min(1).required(),
        
    })

    const {error,value} = schema.validate(req.body)
    console.log("After validating",value)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }
    return next();
}
