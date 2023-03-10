const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const Parent = require('../models/parentModel');
const School = require('../models/schoolModel');
const Photographer = require('../models/photographerModel');
const Admin = require('../models/adminModel');


const checkUser = async (req, res, next) => {
  const auth = req.cookies.auth;
  //   const online = req.cookies.online;

  if (auth) {
    const usertype = auth.split('/')[0];
    const userid = auth.split('/')[1];

    if (usertype === 'admin') {
      req.user = await Admin.findOne({ userid: userid });

      console.log(
        'current user is an Admin whose username is ' + req.user.username
      );
    }
    else{
      req.user = await Parent.findOne({ userid: userid });

      console.log(
        'current user is an Parent whose namename is ' + req.user.username
      );

    }

    await res.cookie('auth', auth, {
      secure: true,
      maxAge: 3600000, //1hr idle time will triggere authentication
    });

    next();
  } else {
    req.user = null;

    res.render('home', {
      icon: 'error',
      title: 'Pls login again',
      alerte: 'Your Auth has expired ',
    });
    console.log('authentication expired ');
  }
};

module.exports = checkUser 
