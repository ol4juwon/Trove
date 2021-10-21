"use strict";
const cron = require("node-cron");
const debug = require("debug")("app:debug");
console.log("init Cron Service")

debug("Cron service to keep Trove alive")
cron.schedule("00 59 * * * *", () => {

    console.log("cron")
}, {});