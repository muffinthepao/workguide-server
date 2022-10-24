const express = require('express')

const multer = require("multer")
const upload = multer()

const questionsController = require('../controllers/question-controller')
const answersShotStackController = require('../controllers/answer-shotstack-controller')
const answersUrlController = require('../controllers/answer-url-controller')
const answersGenericController = require('../controllers/answer-generic-controller')
const videoUploadsMiddleware = require ('../middlewares/video-processing')
const assetCreationMiddleWare = require('../middlewares/asset-creation')

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
router.post('/:questionId/answers/process-multi', assetCreationMiddleWare.findQuestion, assetCreationMiddleWare.findQuestionAnswers, upload.any("files"), videoUploadsMiddleware.uploadMultipleVideos, answersShotStackController.createShotStackAnswer, videoUploadsMiddleware.mergeVideos, answersShotStackController.insertShotstackIdIntoDB)

// router.delete('/:questionId/answers/delete-shotstack')
router.post('/shortstack-callback', answersShotStackController.insertShotstackUrlIntoDB)

// **** URL ANSWER ROUTES **** //
// create, update, delete answer
router.post('/:questionId/answers/url-interstion', assetCreationMiddleWare.findQuestion, assetCreationMiddleWare.findQuestionAnswers, answersUrlController.createUrlAnswer)
router.patch('/:questionId/answers/:answerId/url-insertion', answersUrlController.updateUrlAnswer)

//GENERIC ANSWER ROUTES
router.get('/:questionId/answers', answersGenericController.listAnswers)
// router.get('/:questionId/answers/:answerId', answersController.showAnswer)

module.exports = router;