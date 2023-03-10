const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema(
  {
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
  phone: Number,

  username: {
    type: String,
    unique: [true, 'Username exists'],
    required: [true, 'Username can not be empty'],
    lowercase: true,
  },

  regdate: String,
  randno: String,
  newlogin: String,
  sn: String,
  activeStatus: {
    default: 'active',
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  iama: {
    type: String,
    enum: ['student', 'admin', 'parent', 'photographer', 'teacher'],
    default: 'admin',
  },
  subscription: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: true,
  },
  adminid: Number,
});

module.exports = new mongoose.model('admin', adminSchema);
