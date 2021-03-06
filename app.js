const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser =require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const authRoute = require('./routes/auth')
const filmRoute = require('./routes/films')

app.use('/api/user',authRoute)
app.use('/api/films',filmRoute)

mongoose.connect(process.env.DB_CONNECTOR, ()=>{
    console.log('DB is now connecter')
})

app.listen(3000, ()=>{
    console.log('Server is running')
})