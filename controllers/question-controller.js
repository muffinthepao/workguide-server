// const bcrypt = require("bcrypt");

const questionValidator = require("../joi-validators/question");
const db = require("../models");

module.exports = {
  createQuestion: async (req, res) => {
    // joi validations for question inputs
    let errorObject = {};

    const questionValidationResults =
      questionValidator.createQuestionValidator.validate(req.body, {
        abortEarly: false,
      });

    if (questionValidationResults.error) {
      const validationError = questionValidationResults.error.details;

      validationError.forEach((error) => {
        errorObject[error.context.key] = error.message;
      });

      return res.status(400).json(errorObject);
    }

    let validatedQuestion = { ...questionValidationResults.value };

    try {
      await db.question.create(validatedQuestion);

      res.status(201).json({ success: "question created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to create question" });
    }
  },

  listQuestions: async (req, res) => {
    try {
      let listQuestions = await db.question.findAll({
        // raw: true, //with out without raw, the json sent over will still be in raw format
        attributes: ["id", "question", "userId", "category"],
      });

      console.log(listQuestions);
      res.status(200).json(listQuestions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to get questions" });
    }
  },

  showQuestion: async (req, res) => {
    let pk = req.params.questionId;

    try {
      let showQuestion = await db.question.findByPk(pk, {
        // raw: true, //with out without raw, the json sent over will still be in raw format
        attributes: ["id", "question", "userId", "category"],
      });
      // res.status(201).json({ success: "question created" });

      console.log(showQuestion);
      res.status(200).json(showQuestion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to get question" });
    }
  },

  updateQuestion: async (req, res) => {
    let questionId = req.params.questionId;
    let userId = req.body.userId;

    let errorObject = {};

    const questionValidationResults =
      questionValidator.createQuestionValidator.validate(req.body, {
        abortEarly: false,
      });

    if (questionValidationResults.error) {
      const validationError = questionValidationResults.error.details;

      validationError.forEach((error) => {
        errorObject[error.context.key] = error.message;
      });

      return res.status(400).json(errorObject);
    }

    // let validatedQuestion = { ...questionValidationResults.value };

    try {

      const findQuestionAnswers = await db.answer.findAll({
        where: {
          questionId: questionId
        }
      })

      if (findQuestionAnswers.length >= 1) {
        return res
          .status(403)
          .json({ error: "Cannot update Qns that already have answers" });
      }

     const qnsToUpdate =  await db.question.update(
        { ...req.body },
        {
          where: {
            id: questionId,
            userId: userId,
          },
        }
      );

      if (qnsToUpdate[0] === 0) {
        return res.status(404).json({ message: "Oops, question now found!" });
      }

      res.status(200).json({ message: "Question successfully updated!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "failed to update question" });
    }

  },

  deleteQuestion: async (req, res) => {
    res.send("deleted");
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
