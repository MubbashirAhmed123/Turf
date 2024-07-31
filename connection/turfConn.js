const mongoose= require('mongoose')
require('dotenv').config()
const uri = process.env.MONGODB_URL

    try {
        mongoose.connect('mongodb://localhost:27017/Turf')
        const db=mongoose.connection
        db.once('open',()=>{
            console.log('connected to database')
        })

    } catch (err) {
        console.log(err)
    }


module.exports = mongoose