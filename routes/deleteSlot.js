const express=require('express')
const AllBookedSlots =require('../model/model')

const routes=express.Router()


routes.post('/deleteLast',async (req, res) => {

  const { _id } = req.body
    try {
      const result = await AllBookedSlots.findByIdAndDelete(_id)
      res.status(200).json({ msg: 'Your Booking Has Been Cancelled' })
      
    } catch (error) {
      return res.status(400).json({msg:'somthing went wrong!'})
    }
  
   
  })

module.exports=routes