const express = require('express')

const multer = require("multer")
const upload = multer()

const questionsController = require('../controllers/question-controller')
const answersController = require('../controllers/answer-controller')
const videoUploadsMiddleware = require ('../middlewares/video-processing')

const router = express.Router()

// create, list, show, update, delete question
router.post('/create', questionsController.createQuestion)
router.get('/', questionsController.listQuestions)
router.get('/:questionId', questionsController.showQuestion)
router.put('/:questionId/update', questionsController.updateQuestion)
router.delete('/:questionId/delete', questionsController.deleteQuestion)



// create, list, show, update, delete answer
// router.post('/:questionId/answers', upload.single("file"), videoUploadsMiddleware.uploadVideo, answersController.create)
// router.post('/:questionId/answers/create', upload.any("files"), videoUploadsMiddleware.uploadMultipleVideos, answersController.createAnswer, videoUploadsMiddleware.mergeVideos)
router.post('/:questionId/answers/create', videoUploadsMiddleware.uploadMultipleVideos, answersController.createAnswer, videoUploadsMiddleware.mergeVideos)
router.get('/:questionId/answers', answersController.listAnswers)


// multer
// imagekit
// create record in db status is pending
// shotstack + "callback". normally there is a callback url but currently dont have
// update record in db
// set interval is perpetrual until i clear it after rendering is complete
// google alternatives to set interval

module.exports = router;