const express = require('express');
const cors = require('cors');
const mongoose = require('./connection/turfConn')
const AllBookedSlots =require('./model/model')
require('dotenv').config()
const app = express()

const corsCongig={
  origin:"*",
  Credential:true,
  methods:["GET","POST","PUT","DELETE"],
}
app.use(cors(corsCongig))
app.use(express.json())

const port =process.env.PORT



const insertIntoDb = async (data) => {
  const { name, price, turfName, date, from, to, totalPrice } = data


  try {
    const slot = new AllBookedSlots({

      name, price, turfName, date, from, to, totalPrice,
      
    })

    await slot.save()

  } catch (error) {
    console.log(error)
  }


}


app.get('/',(req,res)=>{
  res.json({msg:'hello'})
})

app.get('/allSlots', async (req, res) => {
  const data = await AllBookedSlots.find()
  res.json(data)
  console.log(data)
})

app.post('/add', async (req, res) => {

  console.log(req.body)
  await insertIntoDb(req.body)
  res.json({ msg: 'success' })
})


app.post('/deleteLast', async (req, res) => {
  console.log(req.body)
  const { _id } = req.body

  const result = await AllBookedSlots.findByIdAndDelete(_id)
  res.json({ msg: 'deleted', result })
})


app.listen(port, () => {
  console.log('server listening')
})




