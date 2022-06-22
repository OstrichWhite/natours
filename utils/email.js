const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }, // if service:'Gmail' Activate in Gmail "less secure app" option
  });

  // Define the email options
  const mailOptions = {
    from: 'Abdul Rahim <abdulrahim@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
