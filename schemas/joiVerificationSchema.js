const Joi = require("joi");
const verificationSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = verificationSchema;
