const Contact = require("../../models/contact");

const getAll = async (req, res, next) => {
  const contactList = await Contact.find();
  console.log(contactList);
  res.json(contactList);
};
module.exports = getAll;
