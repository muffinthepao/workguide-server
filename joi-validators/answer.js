const Joi = require("joi");

const validators = {
  createAnswerValidator: Joi.object({
    answerURL: Joi.string().label("answer URL").required(),
    userId: Joi.number().min(1).label("user Id").required(),
    questionId: Joi.number().min(1).label("question Id").required(),
  }),
};

module.exports = validators;
