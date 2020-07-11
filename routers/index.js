var express= require('express')
const router = new express.Router()
const loginRoutes= require('./loginRoutes')
router.use('/cognito',loginRoutes)

module.exports=router