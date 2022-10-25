const db = require("../models");

const assetCreationChecks = {
  findQuestion: async (req, res, next) => {
    const questionId = req.params.questionId
    //check if question exists
    const findQuestion = await db.question.findByPk(questionId)

    if (!findQuestion) {
      return res
        .status(404)
        .json({ error: "question not found!" });
    }

    next()
  },

  findQuestionAnswers: async (req, res, next) => {
    const questionId = req.params.questionId;
    const userId = 1;

    // check if user has answered question before
      const findQuestionAnswers = await db.answer.findAll({
        where: {
          questionId,
          userId
        }
      })

      console.log(findQuestionAnswers)

      if (findQuestionAnswers.length >= 1) {
        return res
          .status(403)
          .json({ error: "user can only have 1 answer per question" });
      }

    next()
  },

  findAnswer: async (req, res, next) => {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const userId = 1;

    // check if user has answered question before
      const findQuestionAnswers = await db.answer.findAll({
        where: {
          id: answerId,
          userId,
          questionId,
        },
      })

      if (findQuestionAnswers.length === 0) {
        return res
          .status(404)
          .json({ error: "answer not found" });
      }

    next()
  }
};

module.exports = assetCreationChecks;
