const express = require('express');
const app = express();
const router = express.Router();


const studentControllers = require('../controllers/studentControllers');
const studentprg = require('../prgs/studentprg');
// const { checkUser } = require('../middleware/setUser');
const {vpin,authstudent}= require('../middleWare/studentmw')
// const { checkUser } = require('../middleware/setUser');



router.get('/prg', studentprg.signup);
router.post('/studentsignup', authstudent);
router.post('/vpin', vpin, studentControllers.saveSignupdetails);
router.post('/login',studentControllers.login);

module.exports= router
