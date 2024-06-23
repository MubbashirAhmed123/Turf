const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
  name: String,
  phone_number:Number,
  price: Number,
  turfName: String,
  date: String,
  from: String,
  to: String,
  totalPrice: Number,

});

// Create a model from the schema
const AllBookedSlots = mongoose.model('AllBookedSlots', slotSchema);


module.exports = AllBookedSlots

