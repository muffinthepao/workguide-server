const express = require('express')

const multer = require("multer")
const upload = multer()

const questionsController = require('../controllers/question-controller')
const answersController = require('../controllers/answer-controller')
const videoUploadsMiddleware = require ('../middlewares/video-uploads')

const router = express.Router()

// create, list, show, update, delete question
router.post('/create', questionsController.createQuestion)
router.get('/', questionsController.listQuestions)
router.get('/:questionId', questionsController.showQuestion)
router.put('/:questionId/update', questionsController.updateQuestion)
router.delete('/:questionId/delete', questionsController.deleteQuestion)



// create answer
// router.post('/:questionId/answers', upload.single("file"), videoUploadsMiddleware.uploadVideo, answersController.create)

router.post('/:questionId/answers', upload.any("files"), videoUploadsMiddleware.uploadMultipleVideos, answersController.create)


module.exports = router;