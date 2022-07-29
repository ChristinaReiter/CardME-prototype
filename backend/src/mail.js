const nodemailer = require("nodemailer");

// Connect to SMTP Server for mailing
const transporter = nodemailer.createTransport({
  port: 587,
  host: "smtp.office365.com",
  auth: {
    user: "cardme@outlook.de",
    pass: "AhAEJ&JKVNaf5HEpXsmP",
  }
});

module.exports = {
  transporter,
};
