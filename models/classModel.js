const mongoose = require('mongoose');
const ClasssSchema = new mongoose.Schema([{
  name: {
    type: String,
    lowercase: true
    
  },
  created:String,
  students:Number,
  sn:Number,
  idd:Number,
  schoolcode:Number
}]);

module.exports = new mongoose.model('classs',ClasssSchema);
