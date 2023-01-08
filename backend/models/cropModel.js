const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cropSchema = new Schema({
  item: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Crop', cropSchema)