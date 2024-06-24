const express = require('express')
const AllBookedSlots = require('../model/model')

const routes = express.Router()

const insertIntoDb = async (data) => {
  const { name,phone_number, price, turfName, date, from, to, totalPrice } = data

  try {
    const slot = new AllBookedSlots({

      name, phone_number, price, turfName, date, from, to, totalPrice,

    })

    const result = await slot.save()

  } catch (error) {
    console.log(error)
  }

}

routes.post('/add', async (req, res) => {
  console.log(req.body)
  try {
    await insertIntoDb(req.body)
    res.status(200).json({ msg: 'Your Slot Has Been Booked Successfully!' })
  } catch (error) {
    return res.status(400).json({ msg: 'somthing went wrong!' })
  }

})

module.exports = routes
