const mongoose = require('mongoose');
const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },
    address: String,
    schoolname:{
      type: String,
      lowercase: true,
    },
    username:Number,
    schoolcode: Number,
    uniquenum: Number,
    newlogin: {
      type: String,
    },
    regdate: {
      type: String,
    },
    email: {
      type: String,
    },
    img: String,
    pwrd: {
      type: String,
    },
    phone: Number,
    randno: String,
    lastseen: {
      type: String,
    },
    logintimes: Number,
    lastlogin: String,
    subscription: {
      type: Boolean,
      default: false,
    },
    activeStatus: {
      default: 'active',
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    sn: {
      type: Number,
      unique: true,
    },
    schoolid: Number,
    signstudent: String,
    signteacher: String,
    signparent: String,
    signphotographer: String,
    students: Number,
    parentlength: Number,
    teacherlength: Number,
    keephashingadds: {
      type: Boolean,
      default: true,
    },
  }
);

module.exports = new mongoose.model('school', SchoolSchema);
