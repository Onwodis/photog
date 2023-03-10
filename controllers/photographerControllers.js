const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const photographerModel = require('../models/photographerModel');
const pictureModel = require('../models/picturesModel');
const studentModel = require('../models/studentModel');
const randomn = require('crypto').randomBytes(5).toString('hex');
var imaginary = require('imaginary');
const schoolModel = require('../models/schoolModel');
var serverUrl = 'localhost:2345';
const sharp = require('sharp');

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
async function addTextOnImage(pictowaterm, name) {
  try {
    const width = 450;
    const height = 450;
    const text = ' Photog (c) ';

    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title { fill: #001; font-size: 70px; font-weight: bold;}
      </style>
      <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    const image = await sharp(pictowaterm)
      .composite([
        {
          input: svgBuffer,
          top: 50,
          left: 50,
        },
      ])
      .toFile('./public/wm/' + name)
      // .then(async()=>{
      //   try {
      //     await photographerModel.create({
      //       name: details.name,
      //       email: details.email,
      //       username: details.username,
      //       pwrd: hpwrd,
      //       schoolname: school.name,
      //       newlogin: '',
      //       wm:'./public/wm/' + name,
      //       logintimes: 0,
      //       lastlogin: '',
      //       regdate: currentDate(),
      //       userid: getserialnum(1000000),
      //       schoolcode: details.schoolcode,
      //     });
      //     res.render('home', {
      //       alert: 'Account has been succesfully created ',
      //     });
      //   } catch (err) {
      //     console.log('cannot save details due to ' + err);
      //   }
      // })
    // console.log(svgBuffer, image + 'is here');
    // return image;
  } catch (error) {
    console.log(error + ' is error from sharp');
  }
}
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

    // const hpwrd = await bcrypt.hash(details.pwrd, 10);

    try {
      await photographerModel.create({
        name: details.name,
        email: details.email,
        phone: details.phone,
        username: details.username,
        pwrd: hpwrd,
        newlogin: '',
        logintimes: 0,
        lastlogin: '',
        schoolname:school.name,
        regdate: currentDate(),
        userid: getserialnum(1000000),
        schoolcode: details.schoolcode,
      });
      res.render('home', {
        alert: 'Account has been succesfully created ',
      });
    } catch (err) {
      console.log('cannot save details due to ' + err);
    }

    

    // lets proceed with the next step which is encrypting our password before saving
  },
  photographerhome: async (req, res) => {
    const studentss = await studentModel
      .find({
        schoolcode: req.user.schoolcode,
      })
      .sort({ name: 'asc' });
    res.render('dashboard', {
      photographer: req.user,
      students: studentss,
      alert: process.env.loginwelcome + req.user.username,
    });
  },
  login: async (req, res) => {
    const { username, pwrd } = req.body;
    const identity = 'photographer/';

    if (username && pwrd) {
      const ifusername = await photographerModel.findOne({
        username: username,
      });
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
          const studentss = await studentModel.find({
            schoolcode: ifusername.schoolcode,
          });
          res.render('photogdb', {
            photographer: ifusername,
            students: studentss,
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
  uploadpicture: async (req, res) => {
    let file = req.files.pic;
    const filesize = file.size / 1000;
    console.log(filesize + "KB is file size");
    let stdnt = req.body.studentname;
    let Luser = req.user;
    console.log(file + ' is foo myfile ' + stdnt);
    const fileName = file.name.split(' ').join('_');
    // const fileName = file.name;
    console.log('this is Luser mail ');
    let fileDir = './public/uploads/';

    const student = await studentModel.findOne({ username: stdnt });
    const stdntpictures = await pictureModel.find({
      userid: student.userid,
    });
    const pictureslength = stdntpictures.length;

    await file.mv(fileDir + fileName, (err) => {
      if (err) throw err;
    });

    await pictureModel.deleteOne({ pixname: fileName });
    addTextOnImage(`public/uploads/${fileName}`, fileName)
      try{
        await pictureModel.create({
          pixname: fileName,
          for: student.username,
          uploadedby: req.user.username,
          schoolname: req.user.schoolname,
          schoolcode: req.user.schoolcode,
          class: student.class,
          uploaddate: currentDate(),
          sn: pictureslength + 1,
          downloadtimes: 0,
          camerauserid: req.user.userid,
          studentuserid: student.userid,
          imgdir: `/uploads/${fileName}`,
        });

        // res.redirect('/photographer');
        const studentss = await studentModel.find({
          schoolcode: req.user.schoolcode,
        });

        res.render('dashboard', {
          photographer: req.user,
          students: studentss,
          alert: 'Picture upload successful ' ,
        })
      }
      catch(err){
        const studentss = await studentModel.find({
          schoolcode: req.user.schoolcode,
        })

        res.render('dashboard', {
          photographer: req.user,
          students: studentss,
          alert: 'Picture upload failed due to ' + err,
        });
      }
  },
};
