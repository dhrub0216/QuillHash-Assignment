
const express= require('express')
const router= new express.Router()
const Validate=require('../services/AuthService')

var authController = require('../controllers/AuthController');
var nginxController = require('../controllers/NginxController');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.post('/auth/jwdtoken',authController.validate)
router.get('/auth/fetchlogs', nginxController.fetchlogs)
router.get('/auth/filterlogsbyip', nginxController.filterlogsbyIP)
router.get('/auth/filterlogsbymonth', nginxController.filterlogsbymonth)
router.get('/auth/filterlogsbyyear', nginxController.filterlogsbyyear)

module.exports= router