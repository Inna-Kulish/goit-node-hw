const Joi = require("joi");

const userSubscription = require('../constans/userSubscription')

exports.registerSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required().messages({"any.required": `missing required field`}),
      password: Joi.string().min(6).required().messages({"any.required": `missing required field`}),
      subscription: Joi.string().valid(...Object.values(userSubscription)),
    })
    .validate(data);

exports.loginSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required().messages({"any.required": `missing required field`}),
      password: Joi.string().min(6).required().messages({"any.required": `missing required field`}),
    })
    .validate(data);

exports.updateSubscription = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      subscription: Joi.string().valid(...Object.values(userSubscription)).required().messages({"any.required": `missing subscription field`}),
    })
    .validate(data);

exports.updateAvatar = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      avatarURL: Joi.string().required().messages({"any.required": `missing subscription field`}),
    })
    .validate(data);