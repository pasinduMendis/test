const { emailTemplate } = require("../templates/verify_email.template");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_EMAIL_PASSWORD,
  },
});

const reqVerifyEmail = async ({ id, token, email, firstName }) => {
  try {
    const template = emailTemplate(email, firstName, token, id);

    transporter.sendMail(template, (error, info) => {
      if (error) {
        throw new Error(error.message);
      }
    });
  } catch (error) {
    throw error;
  }
};
module.exports = { reqVerifyEmail };
