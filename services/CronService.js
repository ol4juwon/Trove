"use strict";
const cron = require("node-cron");
const debug = require("debug")("app:debug");
console.log("init Cron Service")

console.log("Cron service to keep Trove alive")
cron.schedule("1 * * * * *", () => {

    console.log("cron")
}, {});

console.log("Payment Cron runs every midnight")
cron.schedule("59 23 * * * ",() => {
    // TODO: 
    console.log("Payment cron ")
})