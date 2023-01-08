const express = require('express')
const {
  createCrop,
  getCrops,
  getCrop,
  deleteCrop,
  updateCrop
} = require('../controllers/cropController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all crop routes
router.use(requireAuth)

// GET all crops
router.get('/', getCrops)

//GET a single crop
router.get('/:id', getCrop)

// POST a new crop
router.post('/', createCrop)

// DELETE a crop
router.delete('/:id', deleteCrop)

// UPDATE a crop
router.patch('/:id', updateCrop)


module.exports = router