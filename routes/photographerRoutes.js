const express = require('express');
const app = express();
const router = express.Router();

const photographerControllers = require('../controllers/photographerControllers');
const photographerprg = require('../prgs/photographerprg');
const { checkUser } = require('../middleWare/checkuser');
const { vpin, authphotographer } = require('../middleWare/photographermw');

router.get('/', checkUser, photographerControllers.photographerhome);
router.get('/prg', photographerprg.signup);
// router.post('/photographersignup', authphotographer);
router.post('/vpin', vpin, photographerControllers.saveSignupdetails);
router.post('/login', photographerControllers.login);
router.post('/uploadpicture', checkUser, photographerControllers.uploadpicture);

module.exports = router;
