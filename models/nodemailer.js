const nodemailer = require('nodemailer');

function remove_score(x) {
  const b = x.split('_').join(' ');
  return b;
}

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.PUSER,
    pass: process.env.PASS,
  },
});
const randomn = require('crypto').randomBytes(5).toString('hex');
const verificationmail = {
  mail: (username, email, testran) => {
    var mailOptions = {
      from: `${process.env.websitename}@codar.com`,
      to: email,
      subject: 'Account verification',
      // text: `Hi ${username} , verify account below ${testran}`,
      html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${process.env.websitename} Account verification</title>
            </head>
            <style>
                body{
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    text-align: center;
                    text-transform: capitalize;
                }
                h1{
                    padding: 0 2%;
                    text-transform: capitalize;
                }
                
            </style>
            <body>

                

                <h1>${process.env.websitename} verification page</h1>

                <div>
                    <span>Hi ${username} </span>
                    <span>Your verification pin is ${testran}</span>
                </div>


                
                
            </body>
            </html>

      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
}

module.exports = { verificationmail };
