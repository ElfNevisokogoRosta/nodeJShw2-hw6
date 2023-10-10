const { listContacts } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const contactList = await listContacts();
  res.json(contactList);
};
module.exports = getAll;
