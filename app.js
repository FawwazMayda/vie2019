var express = require("express")
var educationController = require('./educationController')
var app =express()
app.use("/api",educationController)
module.exports = app