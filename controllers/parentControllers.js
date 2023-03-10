const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const parentModel = require('../models/parentModel');
const studentModel = require('../models/studentModel');
const pictureModel = require('../models/picturesModel');
const wmModel = require('../models/wmModel');
const schoolModel = require('../models/schoolModel');
const randomn = require('crypto').randomBytes(5).toString('hex');
var imaginary = require('imaginary');
var serverUrl = 'localhost:2345';
let watermark = require('jimp-watermark');
let options = {
  text: 'Codar Institute',
  textSize: 6,
  dstPath: './watermarked/',
};
const sharp = require('sharp');

async function addTextOnImage(pictowaterm) {
  try {
    const width = 183;
    const height = 183;
    const text = 'Sammy the Shark';

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
          top: 0,
          left: 0,
        },
      ])
      .toFile('');
    console.log(svgBuffer, image);
    return image;
  } catch (error) {
    console.log(error);
  }
}

// addTextOnImage(pictowaterm)

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
    const student = await studentModel.findOne({
      userid: details.studentuserid,
    })
    const parid = getserialnum(1000000)
    student.lastseen=currentDate()
    student.parentuserid=parid
    student.parentname=details.name
    student.save()
    // const object = {
    //   email: email,
    //   name: name,
    //   pwrd: pwrd,
    //   phone: phone,
    //   studentuserid: student.userid,
    //   username: username,
    //   testran: testran,
    // };
    try {
      await parentModel.create({
        name: details.name,
        email: details.email,
        phone: details.phone,
        username: details.username,
        pwrd: hpwrd,
        newlogin: '',
        logintimes: 0,
        lastlogin: '',
        schoolname: student.schoolname,
        regdate: currentDate(),
        userid: parid,
        schoolcode: student.schoolcode,
        childuserid: student.userid,
      });
      res.render('home', {
        alerte: 'Account has been succesfully created ',
        icon:'success',
        title:'Success'
      });
    } catch (err) {
      console.log('cannot save details due to ' + err);
    }

    // lets proceed with the next step which is encrypting our password before saving
  },
  login: async (req, res) => {
    const { username, pwrd } = req.body;
    const identity = 'parent/';

    if (username && pwrd) {
      const ifusername = await parentModel.findOne({ username: username });
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
          const student= await studentModel.findOne({userid:ifusername.childuserid})
          student.logintimes=req.user.logintimes
          student.lastseen=currentDate()
          await student.save()
          const pictures = await wmModel.find({ studentuserid :student.userid});
          res.render('pdb', {
            layout:'parent',
            child:student,
            parent: ifusername,
            pictures: pictures,
            alerte: process.env.loginwelcome + ifusername.username,
          });
        }
      } else {
        res.render('home', {
          icon: 'error',
          alerte: process.env.usernotfound,
        });
      }
    } else {
      res.render('home', {
        icon:"error",
        alerte: process.env.fillinputs,
      });
    }
  },
  enterchildusername: async (req, res) => {
    const { username } = req.body;
    const student = await studentModel.findOne({ username });
    if (student) {
      const stdntpictures = await pictureModel
        .find({ for: username })
        .sort({ sn: 'desc' });
        
        
        const pico= stdntpictures.map((el)=>{
          addTextOnImage("public/"+el.imgdir)

        })
        console.log(pico);

      
      res.render('parentwithchild', {
        parent: req.user,
        child: student,
        pictures: pico,
        // alert: 'Student with username  ' + username + ' doesnt exist',
      });
    } else {
      res.render('dashboard', {
        parent: req.user,
        alert: 'Student with username  ' + username + ' doesnt exist',
      });
    }
  },
  order: async (req, res) => {
    const orderr = req.params.order;
    const pik = await pictureModel.findOne({ pixname: orderr });
    // console.log(pik + " is student pix")
    const useridi = pik.studentuserid;
    const child = await studentModel.findOne({ userid: useridi });
    res.render('paystack', {
      parent: req.user,
      order: pik,
      child: child,
    });
  },
};
