var mongoose = require('mongoose')
mongoose.connect("mongodb+srv://m001-student:abangbola@sandbox-wtclz.mongodb.net/test?retryWrites=true&w=majority",
{useNewUrlParser:true,dbName:"vie"})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Sambung")
});

let eduSchema = new mongoose.Schema({
    "kota" : String,
    "tahun" : Number,
    "TIDAK/BLM SEKOLAH" : Number,
    "BELUM TAMAT SD/SEDERAJAT" : Number,
    "TAMAT SD/SEDERAJAT" : Number,
    "SLTP/SEDERAJAT" : Number,
    "SLTA/SEDERAJAT" : Number,
    "DIPLOMA I/II" : Number,
    "AKADEMI/DIPLOMA III": Number,
    "DIPLOMA IV/STRATA-I":Number,
    "STRATA-II":Number,
    "STRATA-III":Number
})

let edu = mongoose.model('education',eduSchema)
console.log("Education Terbuat")
module.exports = mongoose.model('education')

