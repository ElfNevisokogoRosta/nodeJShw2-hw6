const Joi = require("joi");
const contactSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  owner: Joi.string().required(),
});
module.exports = contactSchema;
