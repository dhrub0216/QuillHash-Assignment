const express = require('express');
const userRouter= require('./routers/index')
const bodyParser= require('body-parser')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(userRouter)

module.exports=app

