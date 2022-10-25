// const bcrypt = require("bcrypt");
const axios = require("axios");
const answerValidator = require("../joi-validators/answer");
const db = require("../models");

module.exports = {
  createShotstackAnswer: async (req, res, next) => {
    console.log(" 4 -- reach create Answer step");

    // console.log("answer created");
    // console.log("4 -- req.body: ", req.body);
    // console.log("4 --req.files: ", req.files);

    // joi validations for answer inputs
    // let errorObject = {};

    // const answerValidationResults =
    //   answerValidator.createAnswerValidator.validate(req.body, {
    //     abortEarly: false,
    //   });

    // if (answerValidationResults.error) {
    //   const validationError = answerValidationResults.error.details;

    //   validationError.forEach((error) => {
    //     errorObject[error.context.key] = error.message;
    //   });
    //   console.log(errorObject)
    //   return res.status(400).json(errorObject);
    // }

    // let validatedAnswer = { ...answerValidationResults.value };

    const questionId = req.params.questionId;

    let allImageKitVideoUrls = JSON.stringify(req.body.imageKitUrls);
    console.log("allImageKitVideoUrls: ", allImageKitVideoUrls);
    let allImageKitVideoIds = JSON.stringify(req.body.imageKitIds);

    try {
      const createdAnswer = await db.answer.create({
        imageKitUrls: allImageKitVideoUrls,
        imageKitIds: allImageKitVideoIds,
        userId: req.body.userId,
        questionId: questionId,
      });

      console.log("createdAnswer: ", createdAnswer);

      console.log(" 5 -- record created in db");
      req.body.answerId = createdAnswer.id;
      console.log(" 6 -- db.answer.id appended to req.body");

      return next();
      // res.status(201).json({ success: "answer created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to create answer" });
    }
  },
  insertShotstackIdIntoDB: async (req, res, next) => {
    console.log(" 9 -- start shotstackId insertion");
    const shotstackId = req.body.shotstackId;
    const answerId = req.body.answerId;

    try {
      const answerUpdated = await db.answer.update(
        { shotstackId },
        {
          where: {
            id: answerId,
          },
        }
      );
      console.log("answerUpdated", answerUpdated);
      console.log(" 10 -- successful shotstackId insertion");
      return next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "unable to update shotstackId" });
    }
  },
  insertShotstackUrlIntoDB: async (req, res) => {
    console.log(" 11 -- start answerUrl insertion");
    console.log("11 -- req.body: ", req.body);
    const shotstackId = req.body.render;
    const shotstackAssetId = req.body.id;
    const shotstackUrl = req.body.url;

    if (req.body.status === "failed") {
      return res.status(503).json({ error: "video failed to be created" });
    }

    try {
      const fullAnswer = await db.answer.update(
        { answerUrl: shotstackUrl, status: "completed", shotstackAssetId },
        {
          where: {
            shotstackId,
          },
        }
      );

      console.log(" 12 -- successful shotstackUrl insertion", fullAnswer);
      res.status(201).json({ message: "video answer created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "unable to update shotstackId" });
    }
  },
  deleteShotstackAnswer: async (req, res) => {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const userId = 1;

    try {
      const answerToDelete = await db.answer.destroy(
        {
          where: {
            id: answerId,
            userId,
            questionId,
          },
        }
      );

      // if (answerToUpdate[0] === 0) {
      //   res.status(404).json({ error: "answer not found!" });
      //   return;
      // }
      console.log("answerToDelete", answerToDelete);
      res.status(200).json({ message: "answer deleted!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "unable to update answer" });
    }
  },
};
