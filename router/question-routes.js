const express = require('express')

const questionsController = require('../controllers/question-controller')

const router = express.Router()

// create user account, save in database
router.post('/create', questionsController.create)

module.exports = router;