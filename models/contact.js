const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
const Contact = model("contact", contactSchema);
contactSchema.post("save", mongooseError);
module.exports = Contact;
