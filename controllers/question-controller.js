// const bcrypt = require("bcrypt");

const questionValidator = require("../joi-validators/question");
const db = require("../models");

module.exports = {
  create: async (req, res) => {
    // joi validations for question inputs
    let errorObject = {};

    const questionValidationResults = questionValidator.createQuestionValidator.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    if (questionValidationResults.error) {
      const validationError = questionValidationResults.error.details;

      validationError.forEach((error) => {
        errorObject[error.context.key] = error.message;
      });

      return res.status(400).json(errorObject);
    }

    let validatedQuestion = {...questionValidationResults.value};

    try {
      await db.question.create(validatedQuestion)

      res.status(201).json({ success: "question created" });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "failed to create question" });
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
