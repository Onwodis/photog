//models
const { verificationmail } = require('../models/nodemailer');
const schoolModel = require('../models/schoolModel');
const parentModel = require('../models/parentModel');
const studentModel = require('../models/studentModel');
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

const authparent = async (req, res) => {
  const { name, username, email, pwrd, cpwrd, href,phone} = req.body;
  console.log('line 35');

  if (name && username && email && pwrd && cpwrd && href &&phone) {
    if (pwrd == cpwrd) {
      console.log('line 38');

      if (pwrd.length > 5) {
        const ifEmail = await parentModel.findOne({ email: email });
        if (!ifEmail) {
          console.log('line 41');
          if (username.length > 3) {
            const ifUsername = await parentModel.findOne({
              username: username,
            });
            if (!ifUsername) {
              console.log(href+ " is href")
              const student = await studentModel.findOne({ signparent: href });
              if (student) {
                const testran = kaka().toString();
                const object = {
                  email: email,
                  name: name,
                  pwrd: pwrd,
                  phone: phone,
                  studentuserid: student.userid,
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

                  res.redirect('/parent/prg');
                  console.log('testran code is  ' + testran);
                } catch (err) {
                  console.log('mail couldnt send because ' + err);
                  res.render('/home', {
                    icon: 'error',
                    alerte: 'mail couldnt send because ' + err,
                  });
                }
              } else {
                res.render('home', {
                  icon: 'error',
                  alerte: 'Username is in use already',
                  title: 'Security Concern ',
                });
              }
            } else {
              res.render('home', {
                icon: 'error',
                alerte: 'Username is in use already',
                title: 'Security Concern ',
              });
            }
          } else {
            res.render('home', {
              icon: 'error',
              alerte: 'Username is too short',
              title: 'Security Concern ',
            });
          }
        } else {
          res.render('home', {
            icon: 'error',
            alerte: 'Email is in use ',
            title: 'Security Concern ',
          });
        }
      } else {
        res.render('home', {
          icon: 'error',
          alerte: 'Password is too short ',
          title: 'Security Concern ',
        });
      }
    } else {
      res.render('home', {
        icon: 'error',
        alerte: 'Passwords do not match',
        title: 'Security Concern ',
      });
    }
  } else {
    res.render('home', {
      icon: 'error',
      alerte: 'kindly fill all input fields',
      title: '!Oops ',
    });
  }
};


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
        icon: 'error',
        alerte: 'That was incorrect',
      });
    }
  } else {
    res.render('home', {
      icon: 'error',
      alerte: 'Authentication expired',
    });
  }
};

module.exports = { authparent, vpin };
