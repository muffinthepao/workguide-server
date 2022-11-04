const express = require('express')

const usersController = require('../controllers/user-controller')

const router = express.Router()

// create user account, save in database
router.post('/join', usersController.join)
router.post('/login', usersController.login)

module.exports = router;