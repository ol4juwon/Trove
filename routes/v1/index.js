"use strict";
const router = require('express').Router();

const authRouter = require('./auth')
const loanRouter = require('./loan')// todo : loan router
const portfolioRouter = require('./portfolio') //  Todo Portfolio router
const paymentRouter = require('./payment')

router.use('/auth', authRouter);
router.use('/portfolio', portfolioRouter);
router.use('/loan', loanRouter);
// router.use('/callback',paymentRouter )
router.use('/payment', paymentRouter);

module.exports  = router;