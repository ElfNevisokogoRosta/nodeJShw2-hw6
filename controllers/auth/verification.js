const User = require("../../models/user");
const { HTTPError } = require("../../utils");

const verification = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw HTTPError(400, "Verification token not valid");
    }
    await User.findByIdAndUpdate(user.id, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({ message: "User successfully verified" });
  } catch (error) {
    error = HTTPError(400, error.message);
    throw error;
  }
};
module.exports = verification;
