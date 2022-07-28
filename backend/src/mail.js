const nodemailer = require("nodemailer");

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
