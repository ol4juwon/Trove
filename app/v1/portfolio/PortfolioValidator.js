"use strict"

const Joi = require('@hapi/joi')

exports.addValidator =  (req,res,next ) => {

    const schema = Joi.object({
        userId: Joi.string().required(),
        symbol : Joi.string().required(),
        totalQuantity: Joi.number().precision(2).required(),
        pricePerShare: Joi.number().precision(2).required(),
        equityValue: Joi.number().precision(2).required()
    })
    const { error} = schema.validate(req.body);
    if(error) return createErrorResponse(res, error, 401);

    return next();
}