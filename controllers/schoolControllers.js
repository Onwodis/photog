const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const schoolModel = require('../models/schoolModel');
const Parents = require('../models/parentModel');
const Students = require('../models/studentModel');
const Teachers = require('../models/teacherModel');
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

  const der = schools.map(async (el) => {
    const schoolcode = el.schoolcode;
    const parents = await Parents.find({ schoolcode: schoolcode });
    el.parentlength = parents.length;
    await el.save();
    const students = await Students.find({ schoolcode: schoolcode });
    el.studentlength = students.length;
    await el.save();
    const teachers = await Teachers.find({ schoolcode: schoolcode });
    el.teacherlength = teachers.length;
    await el.save();
  });

  return der;
};
module.exports = {
  registerschool: async (req, res) => {
    const { name, address, email } = req.body;
    const schoolcode = getserialnum(100000);

    if (name && address && email) {
      const ifemail = await schoolModel.findOne({ email });
      const schools = await schoolModel.find().sort({ sn: 'desc' });

      if (!ifemail) {
        const nname = await schoolModel.findOne({ name });
        if (!nname) {
          try {
            await schoolModel.create({
              name: name,
              username: getserialnum(100),
              email: email,
              sn: schools.length + 1,
              address: address,
              schoolname: name,
              schoolcode: schoolcode,
              regdate: currentDate(),
              schoolid: getserialnum(1000000),
              signstudent: schoolcode + 'z' + getserialnum(100000),
              signteacher: schoolcode + 'z' + getserialnum(100000),
              signparent: schoolcode + 'z' + getserialnum(100000),
              signphotographer: schoolcode + 'z' + getserialnum(100000),
              newlogin: '',
              logintimes: 0,
              lastlogin: '',
            });

            schoolz();
            const schoole = await schoolModel.find().sort({ sn: 'desc' });

            res.render('schools', {
              layout:'admin',
              admin: req.user,
              students: req.students,
              schools: schoole,
              icon:'success',
              alerte: 'School Account has been succesfully created ',
            });
          } catch (err) {
            console.log('cannot save details due to ' + err);
          }
        } else {
          schoolz();
          const schoole = await schoolModel.find().sort({ sn: 'desc' });

          if(!schoole){
            res.render('admindb', {
              layout: 'admin',
              alerte:
                'school with official name ' +
                name +
                ' is already in existence.',
              admin: req.user,
              schools: schoole,
              icon: 'error',
            });
          }
          else{
            res.render('schools', {
              layout: 'admin',
              alerte:
                'school with official name ' +
                name +
                ' is already in existence.',
              admin: req.user,
              schools: schoole,
              icon: 'error',
            });
          }
        }
      } else {
        schoolz();
        const schoole = await schoolModel.find().sort({ sn: 'desc' });

        if (!schoole) {
          res.render('admindb', {
            layout: 'admin',
            alerte:
              'school with official email ' +
              email +
              ' is already in existence.',
            admin: req.user,
            schools: schoole,
            icon: 'error',
          });
        } else {
          res.render('schools', {
            layout: 'admin',
            alerte:
              'school with official email ' +
              email +
              ' is already in existence.',
            admin: req.user,
            schools: schoole,
            icon: 'error',
          });
        }
      }
    }
    else {
      
      const schoole = await schoolModel.find().sort({ sn: 'desc' });

      res.render('admindb', {
        layout: 'admin',
        alerte: 'fill all input fields.',
        admin: req.user,
        schools: schoole,
        icon: 'error',
      });
    }

    // lets proceed with the next step which is encrypting our password before saving
  },
  login: async (req, res) => {
    const { username, pwrd } = req.body;
    const identity = 'school/';

    if (username && pwrd) {
      const ifusername = await schoolModel.findOne({ username: username });
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
          res.render('dashboard', {
            user: ifusername,
            alert: process.env.loginwelcome + ifusername.username,
          });
        }
      } else {
        res.render('home', {
          alert: process.env.usernotfound,
        });
      }
    } else {
      res.render('home', {
        alert: process.env.fillinputs,
      });
    }
  },
};
