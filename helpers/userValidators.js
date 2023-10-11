const Joi = require("joi");

const userSubscription = require('../constans/userSubscription')

exports.registerSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      subscription: Joi.string().valid(...Object.values(userSubscription)),
    })
    .validate(data);

exports.loginSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })
    .validate(data);

exports.updateSubscription = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      subscription: Joi.string().valid(...Object.values(userSubscription)),
    })
    .validate(data);
