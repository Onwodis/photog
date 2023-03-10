const fs = require('fs');
const express = require('express');

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

module.exports = {
  signuppage: async (req, res) => {
    res.render('signuppage');
    // console.log(req.user + "req.user");
  },
  loginpage: async (req, res) => {
    res.render('login');
    // console.log(req.user + "req.user");
  },
  getHome: async (req, res) => {
    res.cookie('auth', '', {
      maxAge: 0,
      overwrite: true,
    });
    res.cookie('clientid', '', {
      maxAge: 0,
      overwrite: true,
    });
    // res.clearCookie("adminid")
    // res.end()
    // res.json('Hello world!')
    res.render('home', {
      title: 'PhotoG !',
      icon: 'success',
      alerte: 'Welcome to photoG !!',
      // ccname: ccname,
    });
    // console.log(req.user + "req.user");
  },
  adminsignuppage: async (req, res) => {
    res.render('adminsignuppage');
    // console.log(req.user + "req.user");
  },
  signupwho: async (req, res) => {
    const iam = req.body.iam;

    if (iam == 'student') {
      res.redirect(307, '/student/studentsignup');
    } else if (iam == 'parent') {
      res.redirect(307, '/parent/parentsignup');
    } else if (iam == 'teacher') {
      res.redirect(307, '/teacher/teachersignup');
    } else if (iam == 'photographer') {
      res.redirect(307, '/photographer/photographersignup');
    } else {
      res.render('home', {
        title: 'PhotoG !',
        icon: 'error',
        alerte: 'Something went wrong !!',
      });
    }
  },
  loginwho: async (req, res) => {
    console.log('its loginwho');

    const iam = req.body.iam;
    if (iam == 'admin') {
      console.log('its admin');
      res.redirect(307, '/admin/login');
    } else if (iam == 'student') {
      res.redirect(307, '/student/login');
    } else if (iam == 'parent') {
      res.redirect(307, '/parent/login');
    } else if (iam == 'teacher') {
      res.redirect(307, '/teacher/login');
    } else if (iam == 'photographer') {
      res.redirect(307, '/photographer/login');
    } else {
      console.log('line 83');
      res.render('home', {
        title: 'PhotoG !',
        icon: 'error',
        alerte: 'Something went wrong !!',
      });
    }
  },
  //homepages
  service: async (req, res) => {
    res.render('service');
  },
}; 
