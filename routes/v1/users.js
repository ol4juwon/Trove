const express = require('express')
const router = express.Router()

router.get('/',(req,res) =>{
    res.send('yrah yeah lisitng')
})

router.get('/user',(req,res) =>{
    res.send('reglar users')
})
router.get('/landlord',(req,res) =>{
    res.send('landlord ')
})
router.get('/agents',(req,res) =>{
    res.send('agents ')
})
router.get('/develeopers',(req,res) =>{
    res.send('developers')
})
router.get('/shortlet',(req,res) =>{
    res.send('shortlet lisitng')
})
module.exports = router;