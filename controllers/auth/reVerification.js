const User = require("../../models/user");
const { HTTPError, sendEmail } = require("../../utils");
const { nanoid } = require("nanoid");
const { PORT } = process.env;
const reVerification = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw HTTPError(400, "User not found");
    }
    if (user.verify) {
      throw HTTPError(400, "User already verified");
    }
    const newToken = nanoid();
    await sendEmail({
      to: email,
      subject: "Pls confirm ur email",
      html: `<h1>Follow the link:<a href="http://localhost:${PORT}/api/users/auth/verify/${newToken}" >link. </a>NOW!!!</h1>`,
    }).catch((error) => console.error(error));
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    throw error;
  }
};
module.exports = reVerification;
