const express = require('express');
const app = express();
const router = express.Router();

const teacherControllers = require('../controllers/teacherControllers');
const teacherprg = require('../prgs/teacherprg');
const { checkUser } = require('../middleware/setUser');
const { vpin, authteacher } = require('../middleWare/teachermw');

router.get('/prg', teacherprg.signup);
router.post('/teachersignup', authteacher);
router.post('/vpin', vpin, teacherControllers.saveSignupdetails);
router.post('/login', teacherControllers.login);


module.exports = router;
