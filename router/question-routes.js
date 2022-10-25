const express = require('express')

const multer = require("multer")
const upload = multer()

const questionsController = require('../controllers/question-controller')
const answersShotStackController = require('../controllers/answer-shotstack-controller')
const answersUrlController = require('../controllers/answer-url-controller')
const answersGenericController = require('../controllers/answer-generic-controller')
const videoUploadsMiddleware = require ('../middlewares/video-processing')
const assetMiddleWare = require('../middlewares/asset')

const router = express.Router()


// **** QUESTION ROUTES **** //
// create, list, show, update, delete question
router.post('/create', questionsController.createQuestion)
router.get('/', questionsController.listQuestions)
router.get('/:questionId', questionsController.showQuestion)
router.put('/:questionId/update', questionsController.updateQuestion)
router.delete('/:questionId/delete', questionsController.deleteQuestion)


// **** SHOTSTACK ANSWER ROUTES **** //
// create, update, delete answer
// router.post('/:questionId/answers', upload.single("file"), videoUploadsMiddleware.uploadVideo, answersShotStackController.create)
router.post('/:questionId/answers/process-multi', assetMiddleWare.findQuestion, assetMiddleWare.findQuestionAnswers, upload.any("files"), videoUploadsMiddleware.uploadMultipleVideos, answersShotStackController.createShotstackAnswer, videoUploadsMiddleware.mergeVideos, answersShotStackController.insertShotstackIdIntoDB)
router.post('/shortstack-callback', answersShotStackController.insertShotstackUrlIntoDB)
router.delete('/:questionId/answers/:answerId/process-multi', videoUploadsMiddleware.deleteVideoUploads, answersShotStackController.deleteShotstackAnswer)

// **** URL ANSWER ROUTES **** //
// create, update, delete answer
router.post('/:questionId/answers/url-interstion', assetMiddleWare.findQuestion, assetMiddleWare.findQuestionAnswers, answersUrlController.createUrlAnswer)
router.patch('/:questionId/answers/:answerId/url-insertion', assetMiddleWare.findAnswer, answersUrlController.updateUrlAnswer)
router.delete('/:questionId/answers/:answerId/url-insertion', assetMiddleWare.findAnswer, answersUrlController.deleteUrlAnswer)

//GENERIC ANSWER ROUTES
router.get('/:questionId/answers', answersGenericController.listAnswers)
// router.get('/:questionId/answers/:answerId', answersController.showAnswer)

module.exports = router;