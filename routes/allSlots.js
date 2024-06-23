const express=require('express')
const AllBookedSlots =require('../model/model')

const routes=express.Router()

routes.get('/allSlots', async(req, res) => {
    const data = await AllBookedSlots.find()
    res.json(data)
    console.log(data)
})


module.exports=routes