const express = require('express')

const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const questionsController = require('../controllers/question-controller')
const answersController = require('../controllers/answer-controller')
const videoUploadsMiddleware = require ('../middlewares/video-uploads')

const router = express.Router()

// create question
router.post('/create', questionsController.create)



// create answer
router.post('/:questionId/answers', upload.single("file"), videoUploadsMiddleware.uploadVideo, answersController.create)

module.exports = router;