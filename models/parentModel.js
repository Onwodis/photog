const mongoose = require('mongoose');
const parentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
  },
  logintimes: {
    type: Number,
  },
  online: false,
  socketid: String,
  tusers: {
    type: Number,
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
  birth: {
    type: String,
    // required: [true, 'Date of birth can not be empty'],
  },
  username: {
    type: String,
    unique: [true, 'Username exists'],
    required: [true, 'Username can not be empty'],
    lowercase: true,
  },
  childuserid:Number,
  regdate: String,
  randno: String,
  newlogin: String,
  logintimes: Number,
  lastlogin: String,
  sn: Number,
  phone: Number,
  userid: Number,
  activeStatus: {
    default: 'active',
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  subscription: {
    type: Boolean,
    default: false,
  },
  iama: {
    type: String,
    enum: ['student', 'admin', 'parent', 'photographer', 'teacher'],
    default: 'parent',
  },
  admin: {
    type: Boolean,
    default: false,
  },
  schoolname: {
    type: String,
    lowercase: true,
  },
  schoolcode: {
    type: Number,
  },
  class: {
    type: String,
  },
  products: {
    id: Number,
    name: String,
    price: Number,
    itempicture: String,
  },
});

module.exports = new mongoose.model('parent', parentSchema);
