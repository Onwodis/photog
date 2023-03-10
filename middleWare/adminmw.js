//models
const { verificationmail } = require('../models/nodemailer');
const schoolModel = require('../models/schoolModel');
const adminModel = require('../models/adminModel');
const jwt = require('jsonwebtoken');
//bring in modules and functional tools
const bcrypt = require('bcryptjs');
let saveit = {};
function capitalise(x) {
  var b = x.charAt(0).toUpperCase() + x.slice(1);
  return b;
}
function currentDate() {
  let ddate = new Date();
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let dateFormat = weekday[ddate.getDay()] + ',' + ddate.toLocaleString();
  return dateFormat;
}
function kaka() {
  var fowls = Math.floor(Math.random() * 100000 + 1);
  return fowls;
}

const authadmin = async (req, res) => {
  const { name, username, email, pwrd, cpwrd, href } = req.body;
  console.log('line 35');

  if (name && username && email && pwrd && cpwrd && href) {
    if (pwrd == cpwrd) {
      console.log('line 38');

      if (pwrd.length > 5) {
        const ifEmail = await adminModel.findOne({ email: email });
        if (!ifEmail) {
          console.log('line 41');
          if (username.length > 3) {
            const ifaddadmin = await schoolModel.findOne({
              signadmin: href,
            });
            if (ifaddadmin) {
              const ifUsername = await adminModel.findOne({
                username: username,
              });
              if (!ifUsername) {
                const schoolcode = href.split('z')[0];

                const testran = kaka().toString();
                const object = {
                  email: email,
                  name: name,
                  pwrd: pwrd,
                  schoolcode: schoolcode,
                  username: username,
                  testran: testran,
                };
                console.log('line 53');

                const secret = process.env.SECRET;

                const verificationPagehbs =
                  process.env.signupverificationhbspage;
                try {
                  verificationmail.mail(username, email, testran);

                  const accessToken = jwt.sign(object, secret, {
                    expiresIn: 60000,
                  });
                  res.cookie('signuptoken', accessToken, {
                    maxAge: 60000,
                  });

                  res.redirect('/admin/prg');
                  console.log('testran code is  ' + testran);
                } catch (err) {
                  console.log('mail couldnt send because ' + err);
                  res.render('/home', {
                    alert: 'mail couldnt send because ' + err,
                  });
                }
              } else {
                res.render('home', {
                  alert: 'Username is in use already',
                });
              }
            } else {
              res.render('home', {
                alert: 'Reference code is incorrect',
              });
            }
          } else {
            res.render('home', {
              alert: 'Username is too short',
            });
          }
        } else {
          res.render('home', {
            alert: 'Email is in use ',
          });
        }
      } else {
        res.render('home', {
          alert: 'Password is too short ',
        });
      }
    } else {
      res.render('home', {
        alert: 'Passwords do not match',
      });
    }
  } else {
    res.render('home', {
      alert: 'kindly fill all input fields',
    });
  }
};
const twocars = 'f';

const vpin = async (req, res, next) => {
  const vpin = req.body.vpin;
  const getCookie = req.cookies.signuptoken;
  if (getCookie) {
    var decoded = jwt.verify(getCookie, process.env.SECRET);
    console.log(decoded.username + ' is from jwt in cookie');

    if (vpin == decoded.testran) {
      // testing if jwt was decoded correctly

      //now we proceed to to saving on our database but we will encrypt the password before doing that ,using bcrypt in our microcontroller
      req.signupdetails = decoded;

      next();
    } else {
      res.render('home', {
        alert: 'That was incorrect',
      });
    }
  } else {
    res.render('home', {
      alert: 'Authentication expired',
    });
  }
};

module.exports = { authadmin, vpin };
