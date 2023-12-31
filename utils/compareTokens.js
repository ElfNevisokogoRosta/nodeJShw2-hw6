const User = require("../models/user");
const compareTokens = async (reqToken, id) => {
  const user = await User.findById(id);
  const { token } = user;
  const result = toString(reqToken) === toString(token);
  return result;
};
module.exports = compareTokens;
