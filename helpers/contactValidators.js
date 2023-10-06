const Joi = require("joi");

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().required().messages({
        "any.required": `missing required name field`,
      }),
      email: Joi.string().email().required().messages({
        "string.email": `must be a valid email`,
        "any.required": `missing required email field`,
      }),
      phone: Joi.string().required().messages({
        "any.required": `missing required phone field`,
      }),
      favorite: Joi.boolean()
    })
    .validate(data);

exports.updateFavoriteSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      favorite: Joi.boolean().required()
    })
    .validate(data);