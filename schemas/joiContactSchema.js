const Joi = require("joi");
const contactSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});
module.exports = contactSchema;
