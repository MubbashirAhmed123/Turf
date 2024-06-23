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
const adminLogin =require('./routes/login')

const app = express()


const corsConfig = {
  origin: "*",
  Credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsConfig))
app.options("", cors(corsConfig))
app.use(express.json())


const port = process.env.PORT

const hashStr = 'KbnTurf@123'
const hash = crypto.createHash('sha256').update(hashStr).digest('hex')
console.log(hash)


app.get('/', (req, res) => {
  res.json({ msg: 'hello' })

})



app.use('/',getAllSlots)

app.use('/',getSingleSlot)

app.use('/',addSlot)

app.use('/',adminLogin)

app.use('/', deleteSlot)





app.listen(port, () => {
  console.log('server listening')
})




