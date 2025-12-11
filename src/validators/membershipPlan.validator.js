const Joi = require('joi');

exports.createPlan = Joi.object({
  name: Joi.string().min(2).required(),
  price: Joi.number().integer().min(0).required(),
  durationInDays: Joi.number().integer().min(1).required(),
  description: Joi.string().allow('', null)
});

exports.updatePlan = Joi.object({
  name: Joi.string().min(2),
  price: Joi.number().integer().min(0),
  durationInDays: Joi.number().integer().min(1),
  description: Joi.string().allow('', null)
});
