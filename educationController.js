var express = require('express')
var router = express.Router()
var edu = require('./education')
var bodyParser = require('body-parser')
router.use(bodyParser.json())


router.get("/",(req,resp)=>{
    resp.status(200).send({status:"OK"})
})

router.get("/:year",(req,res)=>{
    res.send("year is "+req.params.year)
})

module.exports = router