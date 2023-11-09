const nodemailer = require("nodemailer");

const { EMAIL_USER_NAME, EMAIL_USER_PASS, EMAIL_FROM } = process.env;
const sendEmail = async ({ to, subject, html }) => {
  const email = {
    to,
    from: EMAIL_FROM,
    subject,
    html,
  };
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER_NAME,
      pass: EMAIL_USER_PASS,
    },
  });
  const res = await transport.sendMail(email);
};
module.exports = sendEmail;
