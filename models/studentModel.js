const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
  },
  logintimes: {
    type: Number,
  },
  online: false,
  tusers: {
    type: Number,
  },
  age: Number,
  lastseen: {
    type: String,
  },

  email: {
    type: String,
    unique: [true, 'This email is already in use'],
  },
  img: String,
  pwrd: {
    type: String,
    minLength: [6, 'Password is too short'],
  },
  birth: {
    type: String,
    // required: [true, 'Date of birth can not be empty'],
  },
  username: {
    type: String,
    lowercase: true,
  },
  schoolname: {
    type: String,
    lowercase: true,
  },
  schoolcode: {
    type: Number,
    lowercase: true,
  },
  classs: {
    type: String,
  },
  classid: Number,
  regdate: String,
  randno: String,
  newlogin: String,
  sn: Number,
  activeStatus: {
    default: 'active',
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  profileimage: String,
  iama: {
    type: String,
    enum: ['student', 'admin', 'parent', 'photographer', 'teacher'],
    default: 'student',
  },
  subscription: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  userid: Number,
  phone: Number,
  classid: Number,
  signparent: Number,
  products: {
    id: Number,
    name: String,
    price: Number,
    itempicture: String,
  },
  parentuserid: String,
  parentname: String,
});

module.exports = new mongoose.model('student', StudentSchema);
