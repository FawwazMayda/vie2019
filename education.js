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
    
})

