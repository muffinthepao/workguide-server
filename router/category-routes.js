const express = require('express')

const categoriesController = require('../controllers/category-controller')

const router = express.Router()

// create user account, save in database
router.get('/', categoriesController.getCategories)

module.exports = router;