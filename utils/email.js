const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter
    .verify()
    .then(() => console.log('SMTP server is ready to take messages.'))
    .catch((error) => console.error('SMTP server verification failed:', error));

  // 2) Define the email options
  const mailOptions = {
    from: 'Omar Mansour <mans@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
