const express= require('express')
const router= new express.Router()
const loginService= require('../services/AuthService')


module.exports= {
 loginDetails : (req,res)=> {
    const User= mongoose.model('User',userSchema)
    const x= req.body
    const user= new User(x)
    try{
        user.save()
        loginService()
        res.status(200).send(user)
    } catch (e) {
        res.status(404)
    }
    }
}