// //models
// const { verificationmail } = require('../models/nodemailer');
// const photographerModel = require('../models/photographerModel');
// const schoolModel = require('../models/schoolModel');

// const jwt = require('jsonwebtoken');
// //bring in modules and functional tools
// const bcrypt = require('bcryptjs');
// let saveit = {};
// function capitalise(x) {
//   var b = x.charAt(0).toUpperCase() + x.slice(1);
//   return b;
// }
// function currentDate() {
//   let ddate = new Date();
//   const weekday = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];
//   let dateFormat = weekday[ddate.getDay()] + ',' + ddate.toLocaleString();
//   return dateFormat;
// }
// function kaka() {
//   var fowls = Math.floor(Math.random() * 100000 + 1);
//   return fowls;
// }

// const authphotographer = async (req, res) => {
//   const { name, username, email, pwrd, cpwrd, href ,phone} = req.body;
//   console.log('line 35');

//   if (name && username && email && pwrd && cpwrd&&phone) {
//     if (pwrd == cpwrd) {
//       console.log('line 38');

//       if (pwrd.length > 5) {
//         const ifEmail = await photographerModel.findOne({ email: email });
//         if (!ifEmail) {
//           console.log('line 41');
//           if (username.length > 3) {
//             const ifaddphotographer = await schoolModel.findOne({
//               signphotographer: href,
//             });
//             if (ifaddphotographer) {
//               const ifUsername = await photographerModel.findOne({
//                 username: username,
//               });
//               if (!ifUsername) {
//                 const schoolcode = href.split('z')[0];

//                 const testran = kaka().toString();
//                 const object = {
//                   email: email,
//                   name: name,
//                   pwrd: pwrd,
//                   phone: phone,
//                   schoolcode: schoolcode,
//                   username: username,
//                   testran: testran,
//                 };
//                 console.log('line 53');

//                 const secret = process.env.SECRET;

//                 const verificationPagehbs =
//                   process.env.signupverificationhbspage;
//                 try {
//                   verificationmail.mail(username, email, testran);

//                   const accessToken = jwt.sign(object, secret, {
//                     expiresIn: 60000,
//                   });
//                   res.cookie('signuptoken', accessToken, {
//                     maxAge: 60000,
//                   });

//                   res.redirect('/photographer/prg');
//                   console.log('testran code is  ' + testran);
//                 } catch (err) {
//                   console.log('mail couldnt send because ' + err);
//                   res.render('/home', {
//                     icon: 'error',
//                     alerte: 'mail couldnt send because ' + err,
//                   });
//                 }
//               } else {
//                 res.render('home', {
//                   icon: 'error',
//                   alerte: 'Username is in use already',
//                 });
//               }
//             } else {
//               res.render('home', {
//                 icon: 'error',
//                 alerte: 'Reference code is incorrect',
//               });
//             }
//           } else {
//             res.render('home', {
//               icon: 'error',
//               alerte: 'Username is too short',
//             });
//           }
//         } else {
//           res.render('home', {
//             icon: 'error',
//             alerte: 'Email is in use ',
//           });
//         }
//       } else {
//         res.render('home', {
//           icon: 'error',
//           alerte: 'Password is too short ',
//         });
//       }
//     } else {
//       res.render('home', {
//         icon: 'error',
//         alerte: 'Passwords do not match',
//       });
//     }
//   } else {
//     res.render('home', {
//       icon: 'error',
//       alerte: 'kindly fill all input fields',
//     });
//   }
// };

// const vpin = async (req, res, next) => {
//   const vpin = req.body.vpin;
//   const getCookie = req.cookies.signuptoken;
//   if (getCookie) {
//     var decoded = jwt.verify(getCookie, process.env.SECRET);
//     console.log(decoded.username + ' is from jwt in cookie');

//     if (vpin == decoded.testran) {
//       // testing if jwt was decoded correctly

//       //now we proceed to to saving on our database but we will encrypt the password before doing that ,using bcrypt in our microcontroller
//       req.signupdetails = decoded;

//       next();
//     } else {
//       res.render('home', {
//         icon: 'error',
//         alerte: 'That was incorrect',
//       });
//     }
//   } else {
//     res.render('home', {
//       alert: 'Authentication expired',
//     });
//   }
// };

// module.exports = { authphotographer, vpin };
