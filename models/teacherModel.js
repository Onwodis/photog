const mongoose = require('mongoose');
const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  logintimes: {
    type: Number,
  },
  online: false,
  socketid: String,
  tusers: {
    type: Number,
  },

  socketid: String,

  newlogin: {
    type: String,
  },
  regDate: {
    type: String,
  },
  lastlogin: {
    type: String,
  },
  lastseen: {
    type: String,
  },
  school: {
    type: String,
  },
  class: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: [true, 'This email is already in use'],
  },
  img: String,
  pwrd: {
    type: String,
    minLength: [6, 'Password is too short'],
  },
  phone: Number,
  birth: {
    type: String,
  },
  username: {
    type: String,
    unique: [true, 'Username exists'],
    required: [true, 'Username can not be empty'],
    lowercase: true,
  },
  regdate: String,
  randno: String,
  newlogin: String,
  logintimes: Number,
  lastlogin: String,
  sn: Number,
  subscription: {
    type: Boolean,
    default: false,
  },
  userid: Number,
  activeStatus: {
    default: 'active',
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  teacher: {
    type: Boolean,
    default: true,
  },
  schoolname: {
    type: String,
    lowercase: true,
  },
  schoolcode: {
    type: Number,
    lowercase: true,
  },
  products: {
    id: Number,
    name: String,
    price: Number,
    itempicture: String,
  },
});

module.exports = new mongoose.model('teacher', TeacherSchema);
