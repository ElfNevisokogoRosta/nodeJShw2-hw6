const User = require("../../models/user");
const { HTTPError, sendEmail } = require("../../utils");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { PORT } = process.env;

const registration = async (req, res, next) => {
  console.log(req.body);
  try {
    const { password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 13);
    const verifiyEmailToken = nanoid();

    await sendEmail({
      to: email,
      subject: "Pls confirm ur email",
      html: `<h1>Follow the link:<a href="http://localhost:${PORT}/api/users/auth/verify/${verifiyEmailToken}" >link. </a>NOW!!!</h1>`,
    }).catch((error) => console.error(error));
    const avatarURL = gravatar.url(email);
    const newUser = {
      ...req.body,
      password: hashedPassword,
      avatarURL,
      verificationToken: verifiyEmailToken,
    };
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
