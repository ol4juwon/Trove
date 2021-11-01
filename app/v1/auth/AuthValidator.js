"use strict"

const Joi = require('@hapi/joi')
const debug = require("debug")("app:db")

exports.registerValidation = ( req,res,next) => {
console.log("Before Validating ===> ", req.body)
    const schema = Joi.object( {
        firstName: Joi.string().min(4).required(),
        lastName : Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        address: Joi.string().min(6).required(),
        phone: Joi.string().min(8).required(),
        
        userType: Joi.number().required()
    
    })

    const {error,value} = schema.validate(req.body)
    console.log("After validating",value)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }
    return next();
    
}

exports.loginValidation = (req,res,next) => {
    console.log("before Validating", req.body)
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    const {error} = schema.validate(req.body)

    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }

    return next();
}
exports.CNvalidation = (req,res,next) => {
    const schema  = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email()
    })
console.log("ola")
    const { error} = schema.validate(req.body);
    if(error)  return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);

    return next();
}

exports.CEValidation = ( req,res,next) => {
    console.log("got here")
    const schema = Joi.object({
        email: Joi.string().required().email(),
        new_email: Joi.string().required().email()
    })

    const {error} = schema.validate(req.body);
    if(error)  return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);

    return next();

}

exports.updateValidation = ( req,res, next ) => {
    console.log("Before validating update", req.body);
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })

    const { error, data} = schema.validate(req.body)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }

    return next();

}