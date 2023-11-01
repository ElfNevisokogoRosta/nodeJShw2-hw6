const User = require("../models/user");

const { HTTPError } = require("../utils");
const bcrypt = require("bcryptjs");

const logingMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(1);
    if (!user) {
      throw HTTPError(401, "Data is incorrect");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw HTTPError(401, "Data is incorrect");
    }
    req.user = user;
    return next();
  } catch (err) {
    const error = HTTPError(401, err.message);
    throw error;
  }
};
module.exports = logingMiddleware;
