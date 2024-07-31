const express = require('express');
const cors = require('cors');
const {appendFile}=require('fs/promises')
const mongoose = require('./connection/turfConn')

require('dotenv').config()

const getAllSlots =require('./routes/allSlots')
const getSingleSlot=require('./routes/singleSlot')
const addSlot =require('./routes/addSlot')
const deleteSlot=require('./routes/deleteSlot')
const adminLogin =require('./routes/login');
const dashboard=require('./routes/login')

const logout=require('./routes/login');
const { json } = require('body-parser');

const app = express()


const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}


app.use(cors(corsConfig))
app.options("*", cors(corsConfig))
app.use(express.json())

const port = process.env.PORT


app.get('/', (req, res) => {
  res.json({ msg: 'hello' })

})

app.use(async(req,res,next)=>{
  const userInfo={
    ip:req.ip,
    method:req.method,
    url:req.originalUrl,
    headers:req.headers,
    timestamp:new Date().toString()
  }
  console.log(userInfo)

  await appendFile('userlog.json',JSON.stringify(userInfo))


  next()

})



app.use('/',getAllSlots)

app.use('/',getSingleSlot)

app.use('/',addSlot)

app.use('/',adminLogin)

app.use('/',dashboard)

app.use('/',logout)

app.use('/', deleteSlot)




app.listen(port, () => {
  console.log('server listening')
})




