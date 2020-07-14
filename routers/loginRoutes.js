
const express= require('express')
const router= new express.Router()
const Validate=require('../services/AuthService')
//const Controllers= require('../controllers')

//router.use('/cognito', Controllers.login.loginDetails)

var authController = require('../controllers/AuthController');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.post('/auth/jwdtoken',authController.validate)
router.get('/auth/fetchlogs', authController.fetchlogs)
router.get('/auth/filterlogsbyip', authController.filterlogsbyIP)
router.get('/auth/filterlogsbydate', authController.filterlogsbydate)

module.exports= router