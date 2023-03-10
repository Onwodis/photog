
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const Parent = require('../models/parentModel');
const School = require('../models/schoolModel');
const Photographer = require('../models/photographerModel');
const Admin = require('../models/adminModel');



const setUser = async (req, res, next) => {
  const auth = req.cookies.auth;
  req.admin = await Admin.findOne({ username: 'sammy' });
  req.students = await Student.find();
  req.schools = await School.find();

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
    } else {
      req.user = await Parent.findOne({ userid: userid });

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

module.exports = setUser; 