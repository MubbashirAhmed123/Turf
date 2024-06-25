const express = require('express')
const crypto = require('crypto')
require('dotenv').config()
const Admin = require('../model/adminModel');


const routes = express.Router()

const verify = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex')
}


routes.post('/login', async (req, res) => {


    const { email, turfName, password } = req.body

    const result = await Admin.findOne({ email })

    if (result === null) {
        return res.status(400).json({ msg: 'admin not found!' })
    }

    const isPsswordMatch = verify(password)

    if (isPsswordMatch === result.password && turfName === result.turfName) {
        req.session.admin=turfName 
       
        return res.cookie('admin',turfName,{httpOnly:true,expires:120000,secure:true,sameSite:'none'}).status(200).json({ msg: 'login successfull',name:req.session.admin }) 

    } else {
        return res.status(404).json({ msg: 'admin not found!' })

    }

})


routes.get('/dashboard',(req,res)=>{
    if(req.session.admin){
        res.status(200).send({msg:'welcom to admin dashboard',name:req.session.admin})
    }else{
       return res.status(403).send({msg:'unauthorized!, login once again.'})

    }
})


routes.get('/logout',(req,res)=>{
    if(req.session.admin){
        req.session.destroy()
       return res.status(200).send({msg:'logout successfully!'})
        
    }else{
       return res.status(400).send({msg:'something went wrong'})
    }
})
  

module.exports = routes