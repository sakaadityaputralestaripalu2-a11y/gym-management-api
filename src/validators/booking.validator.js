const Joi = require('joi');

exports.createBooking = Joi.object({
  memberId: Joi.number().integer().required(),
  gymClassId: Joi.number().integer().required()
});
