"use strict";
const router = require("express").Router();
// const HomeController =  require("../app/home/HomeController");


 /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trove Test' });
});

router.get('/healthcheck', (req, res) => {
    try {
      res.send({
        uptime: Math.round(process.uptime()),
        message: 'OK',
        timestamp: Date.now(),
      });
    } catch (e) {
      res.status(503).end();
    }
  });

module.exports = router;