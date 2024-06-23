const express=require('express')
const AllBookedSlots =require('../model/model')

const routes=express.Router()

routes.post('/findOne', async(req, res) => {
    console.log(req.body)
    const{phone_number}=req.body
    const data = await AllBookedSlots.findOne({phone_number})
    console.log("single",data)
    if(data){
        return res.json({data,msg:"success"})

    }else{
        return res.json({errmsg:'No Booking Available.'})

    }

    // res.json(data)
    // console.log(data)
    // res.json({msg:'finding'})
})





module.exports=routes