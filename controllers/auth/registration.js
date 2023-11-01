const User = require("../../models/user");
const { HTTPError } = require("../../utils");
const bcrypt = require("bcryptjs");
const registration = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 13);
    const newUser = { ...req.body, password: hashedPassword };
    const user = await User.create(newUser);
    const { email, subscription } = user;
    res.status(201).json({ user: { email, subscription, token: "" } });
  } catch (error) {
    error = HTTPError(409, error.message);
    throw error;
  }
};
module.exports = registration;
