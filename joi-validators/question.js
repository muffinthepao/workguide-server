const Joi = require("joi");

const validators = {
  createQuestionValidator: Joi.object({
    title: Joi.string().min(4, "utf8").label("question").required(),
    userId: Joi.number().min(1).label("user Id").required(),
    category: Joi.string().min(3, "utf8").label("category").required(),
  }),
  deleteQuestionValidator: Joi.object({
    userId: Joi.number().min(1).label("user Id").required(),
  }),
};

module.exports = validators;
