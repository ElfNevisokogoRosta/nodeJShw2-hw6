const { updateContact } = require("../../models/contacts");
const { HTTPError } = require("../../utils");
const update = async (req, res, next) => {
  const { contactId } = req.params;
  const value = req.body;
  const updatedContact = await updateContact(contactId, value);
  if (!updatedContact) {
    throw HTTPError(404, "Not found");
  }
  res.json(updatedContact);
};
module.exports = update;
