const express = require('express');
const cors = require('cors');
const crypto =require('crypto')
const mongoose = require('./connection/turfConn')
const Admin = require('./model/adminModel');

require('dotenv').config()

const getAllSlots =require('./routes/allSlots')
const getSingleSlot=require('./routes/singleSlot')
const addSlot =require('./routes/addSlot')
const deleteSlot=require('./routes/deleteSlot')
const adminLogin =require('./routes/login');
const dashboard=require('./routes/login')
const logout=require('./routes/login')
const session = require('express-session');

const app = express()


const corsConfig = {
  origin: "https://turf-booking-app.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}


app.use(cors(corsConfig))
app.options("", cors(corsConfig))
app.use(express.json())

app.use(session({
  secret:process.env.SECREC_KEY,
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:120000,secure:true,httpOnly:true,sameSite:'strict'}
}))

// app.use((req,res,next)=>{
//   res.header('Access-Control-Allow-Origin',req.headers.origin)
//   res.header('Access-Control-Allow-Credentials',true)
//   res.header('Access-Control-Allow-Headers','Origin,X-Request-With,Content-Type,Accept')

// })

const port = process.env.PORT



// console.log(crypto.createHash('sha256').update(hashstr).digest('hex'))

app.get('/', (req, res) => {
  res.json({ msg: 'hello' })

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




