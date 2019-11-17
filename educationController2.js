var express = require('express')
var router = express.Router()
var edu =require('./education')
var kota = require('./city')
var derajat = require('./derajat')
var tahun = require('./tahun')
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
        d['count'] = jumlah
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
            //data.push(new Object(d))
        })

    })
    console.log("****************")
    console.log(data)
    return data
}

function pieChartData2(resultArr){
    let data = []
    let jumlah = 0
    resultArr.forEach(element => {
        derajat.forEach(sekolah => {
            jumlah += element[sekolah]
        })
    })
    let d ={}
    derajat.forEach(sekolah => {
        d = {}
        d['category']=sekolah
        let count = 0
        resultArr.forEach(element => {
            count += element[sekolah]
        })
        d['count']=count
        d['measure']=count/jumlah
        console.log(d)
        data.push(d)
    })
    return data
}

function barChartData2(resultArr,jenjang){
    let data = []
    let gender = ["L","P"]
    let d = {}
    tahun.forEach(y => {
        d= {}
        d['tahun'] = y
       gender.forEach(g => {
            d['gender']=g
            let jumlah = 0
            resultArr.forEach(element => {
                if(element['tahun']==y && element['gender']==g){
                    //console.log(jenjang)
                    //console.log(element)
                    //console.log(element[jenjang])
                    jumlah += element[jenjang]
                }
            })
            d['count']=jumlah
            console.log(d)
            
            data.push({tahun:String(d['tahun']),gender:d['gender'],count:d['count']})

        })
    })
    return data
}

function lineChartData(resultArr){
    let data = []

    tahun.forEach(y=> {
        let d = {}
        d['tahun']=String(y)
        derajat.forEach(sekolah => {
            let jumlah = 0
            d['jenjang']=sekolah
            resultArr.forEach(element=>{
                if(element['tahun']==y){
                    jumlah += element[sekolah]
                }
            })
            d['jumlah']=jumlah
            console.log(d)
            data.push({tahun:d['tahun'], jenjang:d['jenjang'], jumlah:d['jumlah']})
        })
    })
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

router.get("/piechart/:year/:kota",(req,res)=> {
    let tahun = req.params.year
    let kota = req.params.kota
    edu.find({tahun:tahun,kota:kota},(err,d)=> {
        res.status(200).send(pieChartData2(d))
    })
})

router.get("/barchart/:year/",(req,res)=>{
    let tahun = req.params.year
    edu.find({tahun:tahun},(err,d)=>{
        res.status(200).send(barChartData(d))
    })
})

router.get('/barchart/:kota/:jenjang',(req,res)=>{
    //let tahun = req.params.year
    let kota = req.params.kota
    let jenjang = req.params.jenjang
    console.log(jenjang)
    edu.find({kota:kota},(err,d)=>{
        res.status(200).send(barChartData2(d,jenjang))
    })
})

router.get("/linechart/:kota",(req,res)=>{
    let kota = req.params.kota
    edu.find({kota:kota},(err,d)=>{
        res.status(200).send(lineChartData(d))
    })
})


module.exports = router