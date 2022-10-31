const Joi = require("joi");

const validators = {
  createUrlAnswer: Joi.object({
    answerUrl: Joi.string().uri().trim().label("URL Answer").required(),
  }),
};

module.exports = validators;
