const { removeContact } = require("../../models/contacts");
const { HTTPError } = require("../../utils");
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await removeContact(contactId);
  if (!removedContact) {
    throw HTTPError(404, "Not found");
  }
  res.json(removedContact);
};
module.exports = deleteContact;
