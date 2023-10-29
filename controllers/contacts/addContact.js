const Contact = require("../../models/contact");
const addNew = async (req, res, next) => {
  const { email, name, phone } = req.body;
  const newContact = await Contact.create({ name, email, phone });
  res.status(201).json(newContact);
};
module.exports = addNew;
