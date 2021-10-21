"use strict";
const debug = require("debug")("äpp:debug");
const authService = require("./AuthService");

exports.register = async (req, res, next) => {
  debug("Juwon ", req.body);

  const payload = req.body;
  const { error, data } = await authService.createUser(payload);

  if (error) return createErrorResponse(res, error, 4);

  return createSuccessResponse(res, data, 201);
};

exports.login = async (req, res, next) => {
  const payload = req.body;
  const { error, data } = await authService.login(payload);
  if (error) return createErrorResponse(res, error, 401);

  return createSuccessResponse(res, data, 202);
};

exports.updatePassword = async (req, res) => {
  const payload = req.body;


  const {error, data} = await authService.updatePassword(payload);
console.log("updated user : ",data)

  if (error) return createErrorResponse(res, user, 412);

  return createSuccessResponse(res, data, 202);
};

exports.updateName = async ( req,res) => {
const payload  = req.body;

const {error, data } = await authService.updateName(payload);
if(error) return createErrorResponse(res, error, 412);
return createSuccessResponse(res, data, 202);
}
exports.updateEmail =  async ( req, res ) => {
  const payload = req.body;

  const {error, data } = await authService.updateEmail(payload);

  if(error) return createErrorResponse(res,error, 412);

  return createSuccessResponse(res,data,202);
}
