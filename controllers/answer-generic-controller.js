// const bcrypt = require("bcrypt");

const answerValidator = require("../joi-validators/answer");
const db = require("../models");

module.exports = {
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

      answersArray.forEach(
        (answer, index) => (answersToQuestion[index].answerURL = answer)
      );

      console.log("answersToQuestion", answersToQuestion);
      res.status(200).json(answersToQuestion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to get answers" });
    }
  },
};