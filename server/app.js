var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

if(argv.path){
    var routerApi = require('./routes/api')
    app.use('/api/repos', routerApi)
}

module.exports = app;
