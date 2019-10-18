import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import routerApi from './routes/api'

import minimist from 'minimist'
const argv = minimist(process.argv.slice(2))

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

if(argv.path){
    app.use('/api/repos', routerApi)
}

export default app
