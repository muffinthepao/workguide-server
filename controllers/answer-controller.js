// const bcrypt = require("bcrypt");

const answerValidator = require("../joi-validators/answer");
const db = require("../models");

module.exports = {
  createAnswer: async (req, res, next) => {
    console.log("answer created");
    console.log("from Controller - req.body", req.body.videoIds);
    console.log("from Controller - req.files", req.files);

    // // joi validations for answer inputs
    // let errorObject = {};

    // const answerValidationResults = answerValidator.createAnswerValidator.validate(
    //   req.body,
    //   {
    //     abortEarly: false,
    //   }
    // );

    // if (answerValidationResults.error) {
    //   const validationError = answerValidationResults.error.details;

    //   validationError.forEach((error) => {
    //     errorObject[error.context.key] = error.message;
    //   });

    //   return res.status(400).json(errorObject);
    // }

    // let validatedAnswer = {...answerValidationResults.value};

    let allImageKitVideoUrls = JSON.stringify(req.files);
    let allImageKitVideoIds = JSON.stringify(req.body.videoIds);

    try {
     const createdAnswer =  await db.answer.create({
        imageKitUrls: allImageKitVideoUrls,
        imageKitIds: allImageKitVideoIds,
        userId: req.body.userId,
        questionId: req.body.questionId,
      });

      req.body.answerId = createdAnswer.id
      


      return next()
      // res.status(201).json({ success: "answer created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to create answer" });
    }
  },

  listAnswers: async (req, res) => {
    const questionId = req.params.questionId;
    let answersArray = [];
    try {
      let answersToQuestion = await db.answer.findAll({
        where: {
          questionId,
        },
        attributes: ["id", "answerURL", "userId", "questionId"],
      });

      let FormatAnswersToQuestion = answersToQuestion.forEach((answer) => {
        answersArray.push(JSON.parse(answer.answerURL));
      });

      answersArray.forEach ((answer, index) => answersToQuestion[index].answerURL = answer )

      console.log("answersToQuestion", answersToQuestion)
      res.status(200).json(answersToQuestion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to get answers" });
    }
  },

  // showUser: async (req, res) => {
  //     let userId = req.params.userId

  //     try {
  //         user = await userModel.findById(userId);
  //         if (!user) {
  //             return res.status(404).json({ message: "User not found" });
  //         }
  //     } catch (err) {
  //         console.log(err)
  //         return res.status(500).json({ error: "failed to get user" });
  //     }
  //     const userData = {
  //         fullName: user.fullName,
  //         preferredName: user.preferredName,
  //         email: user.email,
  //         userId: user._id
  //     };
  //     return res.json(userData);
  // },

  // editProfile: async (req, res) => {

  //     let errorObject = {};

  //     //validate user values
  //     const userValidationResults = userValidator.editValidator.validate(
  //         req.body,
  //         {
  //             abortEarly: false,
  //         }
  //     );

  //     //joi validation for edit profile
  //     if (userValidationResults.error) {
  //         const validationError = userValidationResults.error.details;

  //         validationError.forEach((error) => {
  //             errorObject[error.context.key] = error.message;
  //         });

  //         return res.status(400).json(errorObject);
  //     }

  //     let userId = req.params.userId;

  //     try {
  //         const user = await userModel.findById(userId);
  //         if (!user) {
  //             return res.status(404).json(user);
  //         }
  //     } catch (error) {
  //         return res
  //             .status(500)
  //             .json({ error: `Failed to get user of id: ${userId}` });
  //     }

  //     try {
  //         console.log(req.body);
  //         // const response = await user.updateOne(req.body);
  //         const response = await userModel.findByIdAndUpdate(userId, {$set: req.body}, {new: true})
  //         const newUserData = {
  //             fullName: response.fullName,
  //             preferredName: response.preferredName,
  //             email: response.email,
  //             userId: response._id
  //         }
  //         res.status(201).json({ message: "profile updated!", newData: newUserData});
  //     } catch (error) {
  //         res.status(500).json({ error: error.message });
  //     }
  // },

  // deleteUser: async (req, res) => {
  //     try {
  //         let userId = req.params.userId;

  //         let userToDelete = await userModel.findByIdAndDelete(userId);

  //         if (!userToDelete) {
  //             return res.status(500).json({ error: "failed to delete user" });
  //         }

  //         res.status(200).json({ message: "Profile deleted" });
  //     } catch (error) {
  //         res.status(500).json({ error: "failed to delete user" });
  //     }
  // }
};
