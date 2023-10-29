const Contact = require("../../models/contact");
const { HTTPError } = require("../../utils");
const toFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const value = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, value, {
    new: true,
  });
  if (!updatedContact) {
    throw HTTPError(404, "Not found");
  }
  res.json(updatedContact);
};
module.exports = toFavorite;
