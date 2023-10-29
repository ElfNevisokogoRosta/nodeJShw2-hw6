const { isValidObjectId } = require("mongoose");
const { HTTPError } = require("../utils");

const castError = (req, res, next) => {
  const { contactId } = req.params;
  if (isValidObjectId(contactId)) {
    return next();
  }
  return next(HTTPError(400, `${contactId} is not a valid id`));
};

module.exports = castError;
