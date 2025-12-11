// src/validators/auth.validator.js
const Joi = require('joi');

exports.registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  // stronger password policy: min 8, at least 1 number and 1 letter
  password: Joi.string().min(8).pattern(new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])')).required()
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
