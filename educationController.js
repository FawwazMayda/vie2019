var express = require('express')
var router = express.Router()
var edu = require('./education')
var bodyParser = require('body-parser')
var kota = require('./city')
router.use(bodyParser.json())

function cityPercentageOnyear(resultArr){
    
}

router.get("/",(req,resp)=>{
    resp.status(200).send({status:"OK"})
})

router.get("/:year",(req,res)=>{
    tahun = parseInt(req.params.year)
    edu.find({tahun:tahun},(err,d)=>{
        res.status(200).send(d)
    })
})

router.get('/:year/:kota',(req,res)=>{
    let tahun = req.params.year
    let nama_kota = req.params.kota
    res.send("year is "+req.params.year+" kota is "+req.params.kota)
    edu.find({tahun:tahun, kota:nama_kota},(err,d)=>{
        res.status(200).send(d)
    })
})

module.exports = router