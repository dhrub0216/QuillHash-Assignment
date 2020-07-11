
const express= require('express')
const router= new express.Router()
//const Controllers= require('../controllers')

//router.use('/cognito', Controllers.login.loginDetails)

var authController = require('../controllers/AuthController');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/validate', authController.validate_token);

   
module.exports= router