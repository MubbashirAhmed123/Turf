const express = require('express')
const crypto = require('crypto')
require('dotenv').config()
const Admin = require('../model/adminModel');


const routes = express.Router()

const verify = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex')
}


let isLoggedIn=false

const isAdmin=((req,res,next)=>{
    const token=req.headers['authorization']
    if(token==='admin-token'){
        next()
    }else{
        res.status(401).send({msg:'Unauthorized'})
    }
})


routes.post('/login', async (req, res) => {

    
    const { email, turfName, password } = req.body

    const result = await Admin.findOne({ email })

    if (result === null) {
        return res.status(400).json({ msg: 'admin not found!' })
    }

    const isPsswordMatch = verify(password)

    if (isPsswordMatch === result.password && turfName === result.turfName) {
        isLoggedIn=true
       
        return res.status(200).json({ msg: 'login successfull',name:turfName}) 

    } else {
        return res.status(404).json({ msg: 'admin not found!' })

    }

})


routes.get('/dashboard',(req,res)=>{
    if(isLoggedIn){
        res.status(200).send({msg:'welcom to admin dashboard'})
    }else{
        res.status(403).send({msg:'not authorized'})
    }
    
})


routes.get('/logout',(req,res)=>{
    isLoggedIn=false
    return res.status(200).send({msg:'logout successfully!'})
        

})
  

module.exports = routes