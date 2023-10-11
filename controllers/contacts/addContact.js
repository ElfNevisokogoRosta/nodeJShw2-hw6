const { addContact } = require("../../models/contacts");
const addNew = async (req, res, next) => {
  const { email, name, phone } = req.body;
  const newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
};
module.exports = addNew;
