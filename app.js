const express = require('express')
const app = express()
require('./db/conn.js')
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/',require('./Routes/user.js'))


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})