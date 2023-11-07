const User = require("../../models/user");
const { HTTPError } = require("../../utils");

const logout = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).json({ message: "No Content" });
};
module.exports = logout;
