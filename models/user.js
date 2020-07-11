
const mongoose= require('mongoose')
const validator= require('validator')

var userSchema= new mongoose.Schema({
    email: {
        type: 'String',
        required: true,
        trim: true,
        validate(email){ 
            if (!validator.isEmail(email)){
                return ("Your Email Id is not correct")
            }
        }
    },
    password: {
        type: 'String',
        required:true,
        trim :true,
        minlength:6
    }
})

module.exports= userSchema