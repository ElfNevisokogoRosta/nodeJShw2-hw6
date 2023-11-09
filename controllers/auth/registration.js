const User = require("../../models/user");
const { HTTPError } = require("../../utils");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const registration = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 13);
    const avatarURL = gravatar.url(email);
    const newUser = { ...req.body, password: hashedPassword, avatarURL };
    const user = await User.create(newUser);
    const { subscription } = user;
    res
      .status(201)
      .json({ user: { email, subscription, token: "", avatarURL } });
  } catch (error) {
    error = HTTPError(409, error.message);
    throw error;
  }
};
module.exports = registration;
