"use strict";
const router = require('express').Router();

const authRouter = require('./auth')
const loanRouter = require('./loan')// todo : loan router
const portfolioRouter = require('./portfolio') //  Todo Portfolio router


router.use('/auth', authRouter);
router.use('/portfolio', portfolioRouter);
router.use('/loan', loanRouter)


module.exports  = router;