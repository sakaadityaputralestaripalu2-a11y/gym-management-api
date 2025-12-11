const Joi = require('joi');

exports.createClass = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().optional().allow(null),
  scheduleTime: Joi.date().required(),
  maxParticipants: Joi.number().integer().min(1).required()
});

exports.updateClass = Joi.object({
  name: Joi.string().min(2),
  description: Joi.string().allow(null),
  scheduleTime: Joi.date(),
  maxParticipants: Joi.number().integer().min(1)
});
