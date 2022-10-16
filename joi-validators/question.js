const Joi = require("joi");

const validators = {
  createQuestionValidator: Joi.object({
    question: Joi.string().min(3, 'utf8').label("question").required(),
    userId: Joi.number().min(1).label("user Id").required(),
    category: Joi.string().min(3, 'utf8').label("category").required(),
  }),
};

module.exports = validators;
