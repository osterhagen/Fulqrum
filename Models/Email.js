var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fulqrumpurdue@gmail.com',
      pass: 'cs307sucks'
    }
  });

exports.sendEmail = sendEmail;
function sendEmail(recipient, subject, text) { 
      var mailOptions = {
        from: 'fulqrumpurdue@gmail.com',
        to: recipient,
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}