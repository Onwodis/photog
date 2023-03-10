const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const parentModel = require('../models/parentModel');
const adminModel = require('../models/adminModel');
const studentModel = require('../models/studentModel');
const pictureModel = require('../models/wmModel');
const wmModel = require('../models/picturesModel');
const photographerModel = require('../models/photographerModel');
const schoolModel = require('../models/schoolModel');
const classModel = require('../models/classModel');
const Parents = require('../models/parentModel');
const Students = require('../models/studentModel');
const Teachers = require('../models/teacherModel');
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

function capitalise(x) {
  var b = x.charAt(0).toUpperCase() + x.slice(1);
  return b;
}
let buta = 0;
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
      .resize(450,450)
      .toFile('./public/wm/' + name);
  } catch (error) {
    // if (error) throw error;
    console.log(error + ' is error from sharp');
  }
}
module.exports = {
  uploadpictures: async (req, res) => {
    // let file = req.files.pic;
    // const imga=req.files.imga
    // const imgb=req.files.imgb
    // const imgc=req.files.imgc
    // const imgd=req.files.imgd
    const userid = req.cookies.studentuserid
    const student = await Students.findOne({userid });
    let fileDir = './public/uploads/';

    if(req.files){
      const file = req.files.imga
      // console.log(file )
      
      const fileName = file.name.split(' ').join('_');
      await file.mv(fileDir + fileName, (err) => {
        if (err) throw err;
      });

      const iffile = await pictureModel.findOne({ pixname: fileName });
      if(!iffile){
        try {
          await pictureModel.deleteOne({ pixname: fileName });
          addTextOnImage(`public/uploads/${fileName}`, fileName);
          await pictureModel.create({
            pixname: fileName,
            for: student.name,
            uploadedby: 'admin',
            schoolname: student.schoolname,
            schoolcode: student.schoolcode,
            class: student.classs,
            uploaddate: currentDate(),
            wm: `/wm/${fileName}`,
            // sn: pictureslength + 1,
            downloadtimes: 0,
            studentuserid: student.userid,
            imgdir: `/uploads/${fileName}`,
          });
          await wmModel.create({
            pixname: fileName,
            for: student.name,
            uploadedby: 'admin',
            schoolname: student.schoolname,
            schoolcode: student.schoolcode,
            class: student.classs,
            uploaddate: currentDate(),
            wm: `/wm/${fileName}`,
            // sn: pictureslength + 1,
            downloadtimes: 0,
            studentuserid: student.userid,
            imgdir: `/uploads/${fileName}`,
          });

          const studentss = await studentModel.find({
            schoolcode: req.user.schoolcode,
          });

          res.render('uplstd', {
            layout: 'upl',
            admin: req.user,
            student: student,
            icon: 'success',
            title: 'File(s) uploaded successfully',
            alerte: 'Success !',
          });

          // res.redirect('/photographer');
        } catch (err) {
          console.log(err);
        }
      }
      else{
        res.render('uplstd', {
          layout: 'upl',
          admin: req.user,
          student: student,
          icon: 'error',
          title: 'This picture already exists',
          alerte: 'you have to upload a new picture ',
        });
      }
      
      
      // for(let i=0; i<file.length; i++){
      //   file[i].mv('')
      //   const fileName = file[i].name.split(" ").join('_')
      //   await file.mv(fileDir + fileName, (err) => {
      //     if (err) throw err;
      //   });

      //   await pictureModel.deleteOne({ pixname: fileName });
      //   addTextOnImage(`public/uploads/${fileName}`, fileName);
      //   try {
      //     await pictureModel.create({
      //       pixname: fileName,
      //       for: student.username,
      //       uploadedby: 'admin',
      //       schoolname: student.schoolname,
      //       schoolcode: student.schoolcode,
      //       class: student.classs,
      //       uploaddate: currentDate(),
      //       wm:`/wm/${fileName}`,
      //       // sn: pictureslength + 1,
      //       downloadtimes: 0,
      //       studentuserid: student.userid,
      //       imgdir: `/uploads/${fileName}`,
      //     });

      //     // res.redirect('/photographer');
          
      //   } catch (err) {
      //     console.log(err);
      //     // const studentss = await studentModel.find({
      //     //   schoolcode: req.user.schoolcode,
      //     // });

      //     // res.render('dashboard', {
      //     //   photographer: req.user,
      //     //   students: studentss,
      //     //   alert: 'Picture upload failed due to ' + err,
      //     // });
      //   }
      // }
      // const studentss = await studentModel.find({
      //   schoolcode: req.user.schoolcode,
      // });

      // res.render('uplstd', {
      //   layout: 'upl',
      //   admin: req.user,
      //   student: student,
      //   icon: 'success',
      //   title: 'File(s) uploaded successfully',
      //   alerte: 'Success !',
      // });

    }
    else{

      res.render('uplstd', {
        layout: 'upl',
        admin: req.user,
        student: student,
        icon:'error',
        title:'Empty files are not allowed for upload',
        alerte:"you have to upload a minimum of 1 file "
      });

    }
    // const filesize = file.size / 1000;
    // console.log(filesize + 'KB is file size');
    // let stdnt = req.body.studentname;
    // let Luser = req.user;
    // console.log(file + ' is foo myfile ' + stdnt);
    // const fileName = file.name.split(' ').join('_');
    // // const fileName = file.name;
    // console.log('this is Luser mail ');
    // let fileDir = './public/uploads/';

    // // const student = await studentModel.findOne({ username: stdnt });
    // const stdntpictures = await pictureModel.find({
    //   userid: student.userid,
    // });
    // const pictureslength = stdntpictures.length;

    // await file.mv(fileDir + fileName, (err) => {
    //   if (err) throw err;
    // });

    // await pictureModel.deleteOne({ pixname: fileName });
    // addTextOnImage(`public/uploads/${fileName}`, fileName);
    // try {
    //   await pictureModel.create({
    //     pixname: fileName,
    //     for: student.username,
    //     uploadedby: req.user.username,
    //     schoolname: req.user.schoolname,
    //     schoolcode: req.user.schoolcode,
    //     class: student.class,
    //     uploaddate: currentDate(),
    //     sn: pictureslength + 1,
    //     downloadtimes: 0,
    //     camerauserid: req.user.userid,
    //     studentuserid: student.userid,
    //     imgdir: `/uploads/${fileName}`,
    //   });

    //   // res.redirect('/photographer');
    //   const studentss = await studentModel.find({
    //     schoolcode: req.user.schoolcode,
    //   });

    //   res.render('dashboard', {
    //     photographer: req.user,
    //     students: studentss,
    //     alert: 'Picture upload successful ',
    //   });
    // } catch (err) {
    //   const studentss = await studentModel.find({
    //     schoolcode: req.user.schoolcode,
    //   });

    //   res.render('dashboard', {
    //     photographer: req.user,
    //     students: studentss,
    //     alert: 'Picture upload failed due to ' + err,
    //   });
    // }
  },
  studentupl: async (req, res) => {
    const userid = req.params.userid;
    res.cookie("studentuserid",userid)
    const student = await Students.findOne({ userid });
    res.render('uplstd', {
      layout: 'upl',
      admin: req.user,
      student: student,
    });

    // lets proceed with the next step which is encrypting our password before saving
  },
  force: async (req, res) => {
    // const details = req.signupdetails;
    // console.log(
    //   details.name +
    //     ' this are details from user received fron vpin middleware '
    // );

    // const hpwrd = await bcrypt.hash(details.pwrd, 10);

    try {
      await adminModel.create({
        name: 'samuel onwodi',
        email: 'samuel@yahoo.com',
        username: 'sammy',
        pwrd: '$2a$10$419Qyop6.tzHxTIhY4uHLO8MJPZz/DQmFPCcerBpidi7JFeLVyIqe',
        newlogin: '',
        logintimes: 0,
        lastlogin: '',
        regdate: currentDate(),
        adminid: getserialnum(1000000),
      });
      res.render('home', {
        alerte: 'admin Account has been succesfully created ',
      });
    } catch (err) {
      console.log('cannot save details due to ' + err);
    }

    // lets proceed with the next step which is encrypting our password before saving
  },
  addstudent: async (req, res) => {
    const { age } = req.body;
    const names = req.body.names.toLowerCase();
    const pix = req.files.pix;
    const schoolcode = req.cookies.schoolcode;
    const classid = req.cookies.classcode;
    console.log(pix + ' is pix');
    const school = await schoolModel.findOne({ schoolcode: schoolcode });
    const classs = await classModel.findOne({ idd: classid });

    if (names && pix && age) {
      const schoolcode = req.cookies.schoolcode;
      const ifstudent = await studentModel
        .findOne({ schoolcode: schoolcode })
        .where('name')
        .equals(names);

      if (!ifstudent) {
        const students = await studentModel
          .find({ classid: classid })
          .where('schoolcode')
          .equals(schoolcode)
          .sort({ sn: 1 });
        console.log(students);
        if (students.length > 0) {
          const lstudent = students[students.length - 1];

          buta = lstudent.sn + 1;
        } else {
          buta = 0;
        }
        const classn = classs.students;
        classs.students = students.length;
        await classs.save();
        const fileName = pix.name.split(' ').join('_');

        let fileDir = './public/profileimages/';
        await pix.mv(fileDir + fileName, (err) => {
          if (err) throw err;
        });
        const profileimage = `/profileimages/${fileName}`;
        try {
          await studentModel.create({
            name: names,
            age: age,
            profileimage: profileimage,
            email: getserialnum(1000000),
            classs: classs.name,
            classid: classid,
            schoolname: school.name,
            regdate: currentDate(),
            userid: getserialnum(1000000),
            username: names,
            signparent: getserialnum(100000),
            schoolcode: schoolcode,
            sn: buta,
          });
          const students = await studentModel
            .find({ classid: classid })
            .where('schoolcode')
            .equals(schoolcode)
            .sort({ sn: -1 });

          res.render('adminstudents', {
            layout: 'admin',
            admin: req.user,
            school: school,
            class: classs.name,
            students: students,
            alerte: names + ' has been Registered successfully',
            icon: 'success',
            title: 'Success',
          });
        } catch (err) {
          console.log('cannot save details due to ' + err);
          const classsis = await classModel.find({ schoolcode: schoolcode });
          const students = await studentModel
            .find({ classid: classid })
            .where('schoolcode')
            .equals(schoolcode)
            .sort({ sn: -1 });

          res.render('adminstudents', {
            layout: 'admin',
            admin: req.user,
            school: school,
            classses: classsis,
            alerte: names + ' already exists',
            icon: 'error',
            students: students,
            title: 'No duplicate classes allowed',
          });
        }
      } else {
        const classsis = await classModel.find({ schoolcode: schoolcode });

        const students = await studentModel
          .find({ classid: classid })
          .where('schoolcode')
          .equals(schoolcode)
          .sort({ sn: -1 });

        res.render('adminstudents', {
          layout: 'admin',
          admin: req.user,
          school: school,
          classses: classsis,
          alerte: names + ' already exists',
          icon: 'error',
          students: students,
          title: 'No duplicate classes allowed',
        });
      }
    } else {
      const classsis = await classModel.find({ schoolcode: schoolcode });

      res.render('adminstudents', {
        layout: 'admin',
        admin: req.user,
        school: school,
        classses: classsis,
        alerte: 'Pls fill all input fields',
        icon: 'error',
        title: 'You can not submit empty fields',
      });
    }
  },
  addclass: async (req, res) => {
    const classs = req.body.class;
    const schoolcode = req.cookies.schoolcode;
    const school = await schoolModel.findOne({ schoolcode: schoolcode });

    if (classs.length > 4) {
      const schoolcode = req.cookies.schoolcode;
      const ifclass = await classModel
        .findOne({ schoolcode })
        .where('name')
        .equals(classs);

      if (!ifclass) {
        const classses = await classModel.find({ schoolcode: schoolcode });
        console.log(classses);
        if (classses.length > 0) {
          const lclass = classses[classses.length - 1];

          buta = lclass.sn + 1;
        } else {
          buta = 0;
        }

        await classModel.create({
          name: classs,
          created: currentDate(),
          students: null,
          sn: buta,
          school: school,
          idd: getserialnum(100000),
          schoolcode: schoolcode,
        });

        const classsis = await classModel.find({ schoolcode: schoolcode });

        res.render('classes', {
          layout: 'admin',
          admin: req.user,
          school: schoolcode,
          classses: classsis,
          icon: 'success',
          title: 'success',
          alerte: classs + ' has been successfully added',
        });
      } else {
        const classsis = await classModel.find({ schoolcode: schoolcode });

        res.render('classes', {
          layout: 'admin',
          admin: req.user,
          school: school,
          classses: classsis,
          alerte: classs + ' already exists',
          icon: 'error',
          title: 'No duplicate classes allowed',
        });
      }
    } else {
      const classsis = await classModel.find({ schoolcode: schoolcode });

      res.render('classes', {
        layout: 'admin',
        admin: req.user,
        school: school,
        classses: classsis,
        alerte: 'Your class name can not be empty',
        icon: 'error',
        title: 'You submitted an empty input',
      });
    }
  },
  Home: async (req, res) => {
    schoolz();
    const schoole = await schoolModel.find().sort({ sn: 'desc' });
    const photos = await pictureModel.find().sort({ sn: 'desc' });
    const photosp = await pictureModel
      .find({ paid: true })
      .sort({ sn: 'desc' });
    const students = await Students.find().sort({ sn: 'desc' });
    const teachers = await Teachers.find().sort({ sn: 'desc' });
    const parents = await Parents.find().sort({ sn: 'desc' });
    const photog = await photographerModel.find().sort({ sn: 'desc' });

    res.render('admindb', {
      layout: 'admin',
      admin: req.user,
      photos: photos,
      photosp: photosp,
      schools: schoole,
      students: students,
      pl: parents.length,
      tl: teachers.length,
      photog: photog.length,
      icon: 'success',
    });
  },
  registerchool: async (req, res) => {
    console.log('im signing up school');

    const { name, email } = req.body;
    const identity = 'admin/';

    if (name && email) {
      const ifname = await schoolModel.findOne({ name });
      if (!ifname) {
        await schoolModel.create({
          name: name,
          address: address,
          email: email,
          schoolcode: getserialnum(1000000),
        });
        res.render('admindb', {
          admin: ifusername,
          alert: process.env.loginwelcome + ifusername.username,
        });
      } else {
        res.render('home', {
          alert: 'school is already in existence',
        });
      }
    } else {
      res.render('home', {
        alert: process.env.fillinputs,
      });
    }
  },
  login: async (req, res) => {
    console.log('im at administrator');

    const { username, pwrd } = req.body;
    const identity = 'admin/';

    if (username && pwrd) {
      const ifusername = await adminModel.findOne({ username });
      if (ifusername) {
        const ifhpwrd = await bcrypt.compare(pwrd, ifusername.pwrd);
        if (ifhpwrd) {
          ifusername.logintimes = ifusername.logintimes + 1;
          ifusername.lastlogin = ifusername.newlogin;
          ifusername.newlogin = currentDate();

          await ifusername.save();
          await res.cookie('auth', identity + ifusername.adminid, {
            secure: true,
            maxAge: 1200000,
          });
          schoolz();
          const schoole = await schoolModel.find().sort({ sn: 'desc' });
          const photos = await pictureModel.find().sort({ sn: 'desc' });
          const photosp = await pictureModel
            .find({ paid: true })
            .sort({ sn: 'desc' });
          const students = await Students.find().sort({ sn: 'desc' });
          const teachers = await Teachers.find().sort({ sn: 'desc' });
          const parents = await Parents.find().sort({ sn: 'desc' });
          const photog = await photographerModel.find().sort({ sn: 'desc' });

          res.render('admindb', {
            layout: 'admin',
            admin: ifusername,
            photos: photos,
            photosp: photosp,
            schools: schoole,
            students: students,
            pl: parents.length,
            tl: teachers.length,
            photog: photog.length,
            // schoollength: schoole.length,
            icon: 'success',
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
        alert: process.env.fillinputs,
      });
    }
  },
  getschools: async (req, res) => {
    // schoolz();
    const schoole = await schoolModel.find().sort({ sn: -1 });

    schoole.map(async (el) => {
      const students = await Students.find({ schoolcode: el.schoolcode });
      el.students = students.length;
      el.save();
    });

    const schools = await schoolModel.find().sort({ sn: -1 });

    res.render('schools', {
      layout: 'admin',
      schools: schools,
      admin: req.user,
      // alert: process.env.fillinputs,
    });
    console.log(schoole + ' is schole');
  },
  getclasses: async (req, res) => {
    // schoolz();
    const schoolcode = req.params.schoolcode;
    res.cookie('schoolcode', schoolcode);

    const classses = await classModel.find({ schoolcode }).sort({ sn: -1 });
    classses.map(async (el) => {
      const students = await Students.find({ classid: el.idd });
      el.students = students.length;
      el.save();
    });
    const school = await schoolModel.findOne({ schoolcode });

    res.render('classes', {
      layout: 'admin',
      school: school,
      admin: req.user,
      classses: classses,

      // alert: process.env.fillinputs,
    });
  },
  hashcode: async (req, res) => {
    const userid = req.params.hashcode;
    const student = await studentModel.findOne({ userid });

    student.signparent = getserialnum(100000);
    await student.save();
    res.render('uplstd', {
      layout: 'upl',
      admin: req.user,
      student: student,
    });
  },
  getstudents: async (req, res) => {
    const idd = req.params.class;

    const schoolcode = req.cookies.schoolcode;
    res.cookie('classcode', idd);

    const cla = await classModel.findOne({ idd });
    const school = await schoolModel.findOne({ schoolcode });
    let studentss = await Students.find({ schoolcode: schoolcode })
      .where('classid')
      .equals(idd)
      .sort({ sn: -1 });
    const classses = await classModel.find({ schoolcode: schoolcode });
    console.log(studentss + ' is students');

    res.render('adminstudents', {
      layout: 'admin',
      school: school,
      admin: req.user,
      students: studentss,
      classses: classses,
      class: cla.name,

      // alert: process.env.fillinputs,
    });
  },
  enterchildusername: async (req, res) => {
    const { username } = req.body;
    const student = await studentModel.findOne({ username });
    if (student) {
      const stdntpictures = await pictureModel
        .find({ for: username })
        .sort({ sn: 'desc' });

      res.render('parentwithchild', {
        parent: req.user,
        child: student,
        pictures: stdntpictures,
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
