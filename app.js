var express = require("express")
var educationController = require('./educationController')
var queryController = require('./queryController')
var educationController2 = require('./educationController2')
var app = express()
app.use("/api",educationController)
app.use("/api/query",queryController)
app.use("/api2",educationController2)
module.exports = app