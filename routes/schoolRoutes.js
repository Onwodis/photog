const express = require('express');
const app = express();
const router = express.Router();

const schoolControllers = require('../controllers/schoolControllers');
const schoolprg = require('../prgs/schoolprg');
const { vpin, authschool } = require('../middleWare/schoolmw');
const { checkUser } = require('../middleWare/checkuser');

router.get('/prg', schoolprg.signup);
// router.post('/schoolsignup', authschool);
// router.post('/vpin', vpin, schoolControllers.saveSignupdetails);
// router.post('/login', schoolControllers.login);

module.exports = router;
