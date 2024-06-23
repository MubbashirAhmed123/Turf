const express = require('express')
const crypto = require('crypto')
require('dotenv').config()
const Admin = require('../model/adminModel');


const routes = express.Router()

const verify = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex')
}




routes.post('/login', async (req, res) => {

    console.log(req.body)

    const { email, turfName, password } = req.body
    const result = await Admin.findOne({ email })
    console.log(result)

    if (result === null) {
        return res.status(400).json({ msg: 'admin not found!' })
    }

    const isPsswordMatch = verify(password)

    if (isPsswordMatch === result.password && turfName === result.turfName) {
        
       
        return res.json({ msg: 'login successfull',auth:true, name:turfName }) 

    } else {
        return res.status(400).json({ msg: 'admin not found!' })

    }

})

  

module.exports = routes