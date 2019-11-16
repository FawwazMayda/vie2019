var express = require('express')
var router = express.Router()
var edu = require('./education')
var bodyParser = require('body-parser')
var kota = require('./city')
var derajat = require("./derajat")
router.use(bodyParser.json())

function cityPercentageOnyear(resultArr){
    let total = 0
    var data = {}
    resultArr.forEach(element => {
        derajat.forEach(sekolah =>{
            total += element[sekolah]
        })
    });
    data["total"] = total
    kota.forEach(nama_kota => {
        data[nama_kota] = 0
        resultArr.forEach(element => {
            if(element.kota==nama_kota){
                derajat.forEach(sekolah => {
                    data[nama_kota] += element[sekolah]
                })
            }
        })
    })
    return data

}

function citySekolahDist(resultArr){
    let data  = {}
    resultArr.forEach(element => {
        let dataSekolah = {}
        derajat.forEach(sekolah => {
            dataSekolah[sekolah] = element[sekolah]
        })
        console.log(element['gender'])
        data[element['gender']] = dataSekolah
    })
    return data
}
router.get("/",(req,resp)=>{
    resp.status(200).send({status:"OK"})
})

router.get("/:year",(req,res)=>{
    tahun = parseInt(req.params.year)
    edu.find({tahun:tahun},(err,d)=>{
        res.status(200).send(cityPercentageOnyear(d))
    })
})

router.get('/:year/:kota',(req,res)=>{
    let tahun = req.params.year
    let nama_kota = req.params.kota
    edu.find({tahun:tahun, kota:nama_kota},(err,d)=>{
        res.status(200).send(citySekolahDist(d))
    })
})

module.exports = router