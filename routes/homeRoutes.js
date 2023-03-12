const express = require('express');
const app = express()
const router = express.Router();

const mainControllers = require('../controllers/mainControllers');

router.get("/", mainControllers.getHome);

router.post("/sendfile");
router.get('/loginpage', mainControllers.loginpage);
router.get('/adminloginpage', mainControllers.adminloginpage);
router.get('/signuppage', mainControllers.signuppage);
router.get('/adminsignuppage', mainControllers.adminsignuppage);
router.post("/signup",mainControllers.signupwho);

//homepages
router.get('/service', mainControllers.service);








module.exports = router