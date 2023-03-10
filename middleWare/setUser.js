const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const Parent = require('../models/parentModel');
const School = require('../models/schoolModel');
const Photographer = require('../models/photographerModel');
const Admin = require('../models/adminModel');

const setUser = async (req, res, next) => {
  const auth = req.cookies.auth;
  req.admin= await Admin.findOne({username:"sammy"})
  req.students= await Student.find()
  req.schools= await School.find()

  if (auth) {
    const usertype = auth.split('/')[0];
    const userid = auth.split('/')[1];

    if (usertype == 'admin') {
      req.user = await Admin.findOne({ userid: userid });
      // await req.user.save();
      console.log(
        'after checking current user is an admin whose username is ' +
          req.user.username
      );
    }
    else if (usertype == 'student') {
      req.user = await Student.findOne({ userid: userid });
      // await req.user.save();
      console.log(
        'after checking current user is a student whose username is ' +
          req.user.username
      );
    }
    else if (usertype == 'teacher') {
      req.user = await Teacher.findOne({ userid: userid });
      await req.user.save();

      console.log(
        'after checking current user is a teacher whose username is ' +
          req.user.username
      );
    } else if (usertype == 'admin') {
      req.user = await School.findOne({ userid: userid });
      // await req.user.save();

      console.log(
        'after checking current user is a admin whose username is ' +
          req.user.username
      );
    } else if (usertype === 'photographer') {
      req.user = await Photographer.findOne({ userid: userid });
      // await req.user.save();

      console.log(
        'after checking current user is a photographer whose username is ' +
          req.user.username
      );
    } else if (usertype == 'parent') {
      req.user = await Parent.findOne({ userid: userid });
      // await req.user.save();

      console.log(
        'after checking current user is a parent whose username is ' +
          req.user.username
      );
    }
    next();
  } else {
    req.user = null;
    console.log('no user available yet');
    next();
  }
};

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
    else if (usertype === 'student') {
      req.user = await Student.findOne({ userid: userid });

      console.log(
        'current user is a student whose username is ' + req.user.username
      );
    }
    else if (usertype === 'teacher') {
      req.user = await Teacher.findOne({ userid: userid });

      console.log(
        'current user is a teacher whose username is' + req.user.username
      );
    } else if (usertype === 'admin') {
      req.user = await Admin.findOne({ userid: userid });

      console.log(
        'current user is a admin whose username is' + req.user.username
      );
    } else if (usertype === 'photographer') {
      req.user = await Photographer.findOne({ userid });

      console.log(
        'after checking current user is a photographer whose username is ' +
          req.user.username
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
      title:"Pls login again",
      alerte: 'Your Auth has expired ',
    });
    console.log('authentication expired ');
  }
};

module.exports = { setUser, checkUser };
