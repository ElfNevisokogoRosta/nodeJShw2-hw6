const Joi = require("joi");
const subscriptionValues = ["starter", "pro", "business"];
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
  subscription: Joi.valid(...subscriptionValues),
  token: Joi.string(),
  avatarURL: Joi.string(),
});

module.exports = userSchema;
