var express = require('express')
var edu = require("./education")
var bodyParser = require('body-parser')
var router = express.Router()
router.use(bodyParser.json())

router.get("/:year",(req,res)=>{
    console.log("/:year")
    let tahun = req.params.year
    edu.find({tahun:tahun},(err,d)=>{
        res.status(200).send(d)
    })
})

router.get("/:year/:kota",(req,res)=>{
    let tahun = req.params.year
    let kota = req.params.kota
    edu.find({tahun:tahun,kota:kota},(err,d)=>{
        res.status(200).send(d)
    })
})

router.get("/:year/:kota/:gender",(req,res)=>{
    let tahun = req.params.year
    let kota = req.params.kota
    let gender = req.params.gender
    edu.find({tahun:tahun,kota:kota,gender:gender},(err,d)=>{
        res.status(200).send(d)
    })
})

module.exports = router