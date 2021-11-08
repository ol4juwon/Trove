"use strict"
require('dotenv').config({})
const createError = require('http-errors')
const rateLimit = require('express-rate-limit');

let express = require('express')
const app = express()
// const debug = require('debug')('app:debug')
const cors = require('cors')
const moment  = require("moment")
const limiter = rateLimit({
    windowMs: 10 *60 * 1000,
    max:  5
})
// app.use("/api/v1/auth/",limiter)
// app.set("trust proxy", 1)
require("./app/helper");
require('express-async-errors')
require('./startups')(app, express);

//middlewares
// app.use(cors())
app.use(express.json())
app.set('view engine', 'jade');
app.set('views','./views')
app.use((req,res,next) => {
    let requestId = getTimestamp();
    console.log("Time Started", moment().toISOString(true), "headers", req.headers);
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("Response",requestId);
console.log(url)
    const cleanup = () => {
        res.removeListener('finish', logFn);
        res.removeListener('close', abortFn);
        res.removeListener('error', errorFn)
    };
    const logFn = (a,b,c) => {
        console.log("Response", requestId);
        console.log("Time Ended", moment().toISOString(true));
        cleanup();
        // console.log( `[${requestId}] Response ${url}`,`${res.statusCode} ${res.statusMessage};`, {
        //     type: "request-response",
        //     body: req.body,
        //     query: req.query,
        //     params: req.params,
        //     header: req.headers,
        //     result: res.success || res.error,
        //     code: res.statusCode,
        //     client: res.user
        // })
    };

    const abortFn = () => {
        cleanup();
        console.log("Time Ended", moment().toISOString(true));
        // console.log( `Response ${url}`,`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent || Request aborted by the client`, {
        //     type: "request-response",
        //     body: req.body,
        //     query: req.query,
        //     params: req.params,
        //     header: req.headers,
        //     result: res.success || res.error,
        //     code: res.statusCode
        // });
    };
    const errorFn = err => {
        cleanup();
        console.log("Time Ended Error", moment().toISOString(true));
        // console.log( `Response ${url}`,`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent || Request pipeline error: ${err}`, {
        //     type: "request-response",
        //     body: req.body,
        //     query: req.query,
        //     params: req.params,
        //     header: req.headers,
        //     result: res.success || res.error,
        //     code: res.statusCode
        // });
    };

    res.on('finish', logFn); // successful pipeline (regardless of its response)
    res.on('close', abortFn); // aborted pipeline
    res.on('error', errorFn); // pipeline internal error
    return next();

})
app.use('/',require("./routes/home"))
app.use('/api/v1', require("./routes/v1"))


app.use((req, res, next) => {
    return next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    console.log("error", {err});
    // logger(err.message, err, {
    //     request: {
    //         url: req.url|| {} ,
    //         body: req.body || {},
    //         params: req.params || {},
    //         query: req.query || {}
    //     }
    // });
    // winston.error(err.message, err);
    res.status(err && err.status || 500);
    res.send({error: err && err.message || "An error occurred"});
});


module.exports = app