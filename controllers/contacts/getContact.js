const Contact = require("../../models/contact");
const { HTTPError } = require("../../utils");
const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById({ _id: contactId });
  if (!contact) {
    throw HTTPError(404, "Not found");
  }
  res.json(contact);
};
module.exports = getContact;
