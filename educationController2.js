var express = require('express')
var router = express.Router()
var edu =require('./education')
var kota = require('./city')
var derajat = require('./derajat')
var bodyParser = require('body-parser')
router.use(bodyParser.json())

function pieChartData(resultArr){
    let total = 0
    let data = []
    resultArr.forEach(element => {
        derajat.forEach(sekolah => {
            total += element[sekolah]
        })
    });
    kota.forEach(nama_kota => {
        let d = {}
        let jumlah = 0
        resultArr.forEach(element => {
            if(element['kota']==nama_kota){
                derajat.forEach(sekolah => {
                    jumlah += element[sekolah]
                })
            }
        })
        d['categories']=nama_kota
        d['measure']=jumlah / total
        data.push(d)
    })

    return data


}

router.get('/',(req,res)=>{
    res.status(200).send("OK")
})

router.get('/:year',(req,res)=>{
    let tahun = req.params.year
    edu.find({tahun:tahun},(err,d)=>{
        res.status(200).send(pieChartData(d))
    })
})

module.exports = router