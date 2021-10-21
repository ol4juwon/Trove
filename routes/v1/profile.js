const router = require("./auth");
const verify = require('./verifyToken')
router.get('/',verify,(req,res)=>{
    res.json({
        posts:{
            title:"",
            desc: "kkdlk"
        }
    })
})

module.exports = router;