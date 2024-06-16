const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send emails to users
    const info = await transporter.sendMail({
      from: `${process.env.MAIL_USER} ${process.env.APP_NAME}`,
      to: email,
      subject: title,
      html: body,
    });

    console.info("Email info: ", info);
    return info;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = mailSender;
