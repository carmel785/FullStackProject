const express = require('express')
require('./configs/database')
// var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
app.use(cors())

bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())

app.use('/', require('./routers/indexRouter'))
app.use('/routingToCinemaWS', require('./routers/routingToCinemaWS'))

app.listen(8000)
console.log("web service is running..")
