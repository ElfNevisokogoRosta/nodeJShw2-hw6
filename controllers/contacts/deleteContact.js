const Contact = require("../../models/contact");
const { HTTPError } = require("../../utils");
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndDelete(contactId);
  if (!removedContact) {
    throw HTTPError(404, "Not found");
  }
  res.json(removedContact);
};
module.exports = deleteContact;
