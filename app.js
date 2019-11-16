var express = require("express")
var educationController = require('./educationController')
var queryController = require('./queryController')
var app = express()
app.use("/api",educationController)
app.use("/api/query",queryController)
module.exports = app