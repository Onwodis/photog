const express = require('express');
const app = express();
const router = express.Router();

const mainControllers = require('../controllers/mainControllers');
const adminControllers = require('../controllers/adminController');
const schoolControllers = require('../controllers/schoolControllers');
const checkUser = require('../middleWare/checkuser');


// router.get('/', mainControllers.getHome);

router.post('/sendfile');
// router.get('/adminsignuppage', mainControllers.adminsignuppage);
router.post('/signup', mainControllers.signupwho);
router.post('/registerchool', schoolControllers.registerschool);
router.post('/login', adminControllers.login);
router.post('/addclass', adminControllers.addclass);
router.post('/uploads', adminControllers.uploadpictures);
router.post('/addstudent', adminControllers.addstudent);
router.get('/getschools', checkUser, adminControllers.getschools);
router.get('/getclasses/:schoolcode', checkUser, adminControllers.getclasses);
router.get('/getstudents/:class', checkUser, adminControllers.getstudents);
router.get('/schoolcode/:hashcode', checkUser, adminControllers.hashcode);
router.get('/packages', checkUser, adminControllers.packages);
router.get('/orders', checkUser, adminControllers.orders);
router.get('/', adminControllers.Home);
router.get('/indstudents/:userid', checkUser, adminControllers.studentupl);

router.get('/obiajulu', adminControllers.force);

module.exports = router;
