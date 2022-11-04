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

    console.log(validatedQuestion);

    try {
      const newQuestion = await db.question.create({
        title: validatedQuestion.title,
        userId: validatedQuestion.userId,
      });
      
      validatedQuestion.categories.forEach(async (category) => {
        const categoryEntry = await db.category.findByPk(category.value);
  
        await newQuestion.addCategory(categoryEntry, {
          through: "questionsCategories",
        });
      });

      res.status(201).json({message: "question created!"})
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "failed to create question!"})
    }


  },

  // createQuestion: async (req, res) => {
  //   // joi validations for question inputs
  //   console.log(req.body)
  //   res.status(201).json(req.body)
  // },

  listQuestions: async (req, res) => {
    try {
      let listQuestions = await db.question.findAll({
        // raw: true, //with out without raw, the json sent over will still be in raw format
        attributes: ["id", "title", "userId", "createdAt"],
        include: {
          model: db.category,
          through: {
            attributes: [],
          },
        },
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
        attributes: ["id", "question", "userId"],
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
          questionId: questionId,
        },
      });

      if (findQuestionAnswers.length >= 1) {
        return res
          .status(403)
          .json({ error: "Cannot update Qns that already have answers" });
      }

      const qnsToUpdate = await db.question.update(
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
    let questionId = req.params.questionId;
    let userId = req.body.userId;

    let errorObject = {};

    const questionValidationResults =
      questionValidator.deleteQuestionValidator.validate(req.body, {
        abortEarly: false,
      });

    if (questionValidationResults.error) {
      const validationError = questionValidationResults.error.details;

      validationError.forEach((error) => {
        errorObject[error.context.key] = error.message;
      });

      return res.status(400).json(errorObject);
    }

    try {
      const findQuestionAnswers = await db.answer.findAll({
        where: {
          questionId: questionId,
        },
      });

      if (findQuestionAnswers.length >= 1) {
        return res
          .status(403)
          .json({ error: "Cannot delete Qns that already have answers" });
      }

      const questionToDelete = await db.question.destroy({
        where: {
          id: questionId,
          userId: userId,
        },
      });

      if (questionToDelete[0] === 0) {
        return res.status(404).json({ message: "Oops, question now found!" });
      }

      res.status(200).json({ message: "Question successfully deleted!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "failed to delete question" });
    }
  },
};
