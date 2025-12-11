const Joi = require('joi');

exports.createMember = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().optional().allow(null),
  phoneNumber: Joi.string().optional().allow(null),
  membershipPlanId: Joi.number().integer().required()
});

exports.updateMember = Joi.object({
  fullName: Joi.string().min(3),
  email: Joi.string().email(),
  phoneNumber: Joi.string()
});
