
const answerValidator = require("../joi-validators/answer");
const db = require("../models");

module.exports = {
  createUrlAnswer: async (req, res) => {
    try {
      await db.answer.create({
        answerUrl: req.body.answerUrl,
        shotstackId: "n/a",
        imageKitUrls: "n/a",
        imageKitIds: "n/a",
        userId: req.body.userId,
        questionId: req.body.questionId,
        status: "completed",
        answerMedthod: "url",
      });

      res.status(201).json({ message: "answer created!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to create answer" });
    }
  },

  updateUrlAnswer: async (req, res) => {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const userId = 1;
    const answerUrl = req.body.answerUrl;

    try {
      const answerToUpdate = await db.answer.update(
        { answerUrl },
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

      console.log("answerUpdated", answerToUpdate);
      res.status(200).json({ message: "answer updated!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "unable to update answer" });
    }
  },

  deleteUrlAnswer: async (req, res) => {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const userId = 1;
    
    try {
      const answerToUpdate = await db.answer.destroy(
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
      console.log("answerUpdated", answerToUpdate);
      res.status(200).json({ message: "answer deleted!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "unable to update answer" });
    }
  },
  
};
