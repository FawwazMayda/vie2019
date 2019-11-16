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
    let cum = 0
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
        cum += d['measure']
        data.push(d)
    })
    console.log(data)
    console.log(cum)
    return data
}

function barChartData(resultArr){
    let data = new Array()
    kota.forEach(nama_kota => {
        let d = {}
        d['group']=nama_kota
        derajat.forEach(sekolah => {
            let jumlah = 0
            d['category']=sekolah
            resultArr.forEach(element => {
                if(element['kota']==nama_kota){
                    jumlah += element[sekolah] 
                }
            })
            d['measure']=jumlah
            console.log(d)
            data.push({group:d['group'], category:d['category'], measure:d['measure']})
        })

    })
    console.log("****************")
    console.log(data)
    return data
}
router.get("/",(req,res)=>{
    res.status(200).send({status:"OK"})
})

router.get("/piechart/:year",(req,res)=>{
    let tahun = req.params.year
    edu.find({tahun:tahun},(err,d)=>{
        res.status(200).send(pieChartData(d))
    })
})

router.get("/barchart/:year/",(req,res)=>{
    let tahun = req.params.year
    edu.find({tahun:tahun},(err,d)=>{
        res.status(200).send(barChartData(d))
    })
})

module.exports = router