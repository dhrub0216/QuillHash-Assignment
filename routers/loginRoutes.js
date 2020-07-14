
const express= require('express')
const router= new express.Router()
const Validate=require('../services/AuthService')
//const Controllers= require('../controllers')

//router.use('/cognito', Controllers.login.loginDetails)

var authController = require('../controllers/AuthController');
var nginxController = require('../controllers/NginxController');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.post('/auth/jwdtoken',authController.validate)
router.get('/auth/fetchlogs', nginxController.fetchlogs)
router.get('/auth/filterlogsbyip', nginxController.filterlogsbyIP)
router.get('/auth/filterlogsbydate', nginxController.filterlogsbydate)

module.exports= router