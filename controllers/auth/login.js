const User = require("../../models/user");
const { HTTPError } = require("../../utils");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
const login = async (req, res, next) => {
  try {
    const user = req.user;
    const { id, email, subscription, verify } = user;
    console.log(user);
    const createdToken = jwt.sign({ id }, JWT_SECRET, { expiresIn: "23h" });
    const loginedUser = await User.findByIdAndUpdate(
      id,
      { token: createdToken },
      { new: true }
    );
    if (!verify) {
      throw HTTPError(401, "Email not verified");
    }
    if (!loginedUser) {
      throw HTTPError(500, "Failed to update user token");
    }

    const { token } = loginedUser;
    res.status(200).json({ token, user: { email, subscription } });
  } catch (error) {
    error = HTTPError(401, error.message);
    next(error);
  }
};

module.exports = login;
