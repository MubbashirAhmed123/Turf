const express = require('express');
const cors = require('cors');
const mongoose = require('./connection/turfConn')

require('dotenv').config()

const getAllSlots =require('./routes/allSlots')
const getSingleSlot=require('./routes/singleSlot')
const addSlot =require('./routes/addSlot')
const deleteSlot=require('./routes/deleteSlot')
const adminLogin =require('./routes/login');
const dashboard=require('./routes/login')

const logout=require('./routes/login')

const app = express()


const corsConfig = {
  origin: "https://turf-booking-app.vercel.app",
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




