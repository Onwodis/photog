const express = require('express');
const app = express();
const router = express.Router();

const parentControllers = require('../controllers/parentControllers');
const parentprg = require('../prgs/parentprg');
const { checkUser } = require('../middleware/setUser');

const { vpin, authparent } = require('../middleWare/parentmw');

router.get('/prg', parentprg.signup);
router.post('/parentsignup', authparent);
router.post('/vpin', vpin, parentControllers.saveSignupdetails);
router.post('/login', parentControllers.login);
router.get('/order/:order', checkUser, parentControllers.order);
router.post('/enterchildusername',checkUser, parentControllers.enterchildusername);


module.exports = router;
