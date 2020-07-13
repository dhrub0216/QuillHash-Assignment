
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

   
module.exports= router