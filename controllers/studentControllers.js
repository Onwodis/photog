const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const studentModel = require('../models/studentModel');
const parentModel = require('../models/parentModel');

const schoolModel = require('../models/schoolModel');
const randomn = require('crypto').randomBytes(5).toString('hex');

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
function getserialnum(bh) {
  var oboi = Math.random() + 1;
  var num = Math.floor(oboi * bh);
  return num;
}

const schoolz = async (req, res) => {
  const schools = await schoolModel.find().sort({ sn: 'desc' });

  schools.map(async (el, index) => {
    const schoolcode = el.schoolcode;
    const parents = await Parents.find({ schoolcode: schoolcode });
    el.parentslength = parents.length;
    await el.save();
    const students = await Students.find({ schoolcode: schoolcode });
    el.studentlength = students.length;
    await el.save();
    const teachers = await Teachers.find({ schoolcode: schoolcode });
    el.teacherlength = teachers.length;
    await el.save();
  });

  const schoole = await schoolModel.find().sort({ sn: 'desc' });
};

module.exports = {
  saveSignupdetails: async (req, res) => {
    const details = req.signupdetails;
    console.log(
      details.name +
        ' this are details from user received fron vpin middleware '
    );

    const hpwrd = await bcrypt.hash(details.pwrd, 10);
    const school = await schoolModel.findOne({
      schoolcode: details.schoolcode,
    });

    try {
      await studentModel.create({
        name: details.name,
        email: details.email,
        phone: details.phone,
        username: details.username,
        classs: details.classs,
        pwrd: hpwrd,
        newlogin: '',
        logintimes: 0,
        lastlogin: '',
        schoolname: school.name,
        regdate: currentDate(),
        userid: getserialnum(1000000),
        schoolcode: details.schoolcode,
      });
      res.render('home', {
        title: 'PhotoG !',
        icon: 'success',
        alerte: 'Account has been succesfully created !!',
      });
    } catch (err) {
      console.log('cannot save details due to ' + err);
    }

    // lets proceed with the next step which is encrypting our password before saving
  },
  login: async (req, res) => {
    const { username, pwrd } = req.body;
    const identity = 'student/';

    if (username && pwrd) {
      const ifusername = await studentModel.findOne({ username: username });
      if (ifusername) {
        const ifhpwrd = await bcrypt.compare(pwrd, ifusername.pwrd);
        if (ifhpwrd) {
          ifusername.logintimes = ifusername.logintimes + 1;
          ifusername.lastlogin = ifusername.newlogin;
          ifusername.newlogin = currentDate();

          await ifusername.save();
          await res.cookie('auth', identity + ifusername.userid, {
            secure: true,
            maxAge: 1200000,
          });
          res.render('studentdb', {
            user: ifusername,
            title: 'PhotoG !',
            icon: 'success',
            alerte: process.env.loginwelcome + ifusername.username,
          });
        }
      } else {
        res.render('home', {
          title: 'PhotoG !',
          icon: 'error',
          alerte: process.env.usernotfound,
        });
      }
    } else {
      res.render('home', {
        title: 'PhotoG !',
        icon: 'error',
        alerte: process.env.fillinputs
      });
    }
  },
};
