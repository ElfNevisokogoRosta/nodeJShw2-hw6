const { getContactById } = require("../../models/contacts");
const { HTTPError } = require("../../utils");
const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw HTTPError(404, "Not found");
  }
  res.json(contact);
};
module.exports = getContact;
