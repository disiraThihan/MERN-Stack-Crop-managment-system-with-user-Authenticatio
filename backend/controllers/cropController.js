const Crop = require('../models/cropModel')
const mongoose = require('mongoose')

// get all crops
const getCrops = async (req, res) => {
  const user_id = req.user._id

  const crops = await Crop.find({user_id}).sort({createdAt: -1})

  res.status(200).json(crops)
}

// get a single crop
const getCrop = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such crop'})
  }

  const crop = await Crop.findById(id)

  if (!crop) {
    return res.status(404).json({error: 'No such crop'})
  }
  
  res.status(200).json(crop)
}


// create new crop
const createCrop = async (req, res) => {
  const {item, amount} = req.body

  let emptyFields = []

  if(!item) {
    emptyFields.push('item')
  }
  if(!amount) {
    emptyFields.push('amount')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const crop = await Crop.create({item,amount, user_id})
    res.status(200).json(crop)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a crop
const deleteCrop = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such crop'})
  }

  const crop = await Crop.findOneAndDelete({_id: id})

  if (!crop) {
    return res.status(400).json({error: 'No such crop'})
  }

  res.status(200).json(crop)
}

// update a crop
const updateCrop = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such crop'})
  }

  const crop = await Crop.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!crop) {
    return res.status(400).json({error: 'No such crop'})
  }

  res.status(200).json(crop)
}


module.exports = {
  getCrops,
  getCrop,
  createCrop,
  deleteCrop,
  updateCrop
}
